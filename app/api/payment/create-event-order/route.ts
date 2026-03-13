import { NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { teamSupabase as supabase } from "@/lib/supabase";

// Initialize Cashfree with environment-specific credentials
const cashfree = new Cashfree(
    process.env.CASHFREE_ENV === "PRODUCTION" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID!,
    process.env.CASHFREE_SECRET_KEY!
);

/** Parse "₹100", "₹500/Team", "₹600/Band" → numeric amount */
function parseAmount(fee: string): number {
    const match = fee.match(/\d+/);
    return match ? parseInt(match[0], 10) : 100;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { eventSlug, eventName, teamName, registrationFee, members } = body;

        // Validate required fields
        if (!eventSlug || !eventName || !teamName || !Array.isArray(members) || members.length === 0) {
            return NextResponse.json(
                { success: false, message: "Missing required registration fields." },
                { status: 400 }
            );
        }

        // Validate all member details
        for (let i = 0; i < members.length; i++) {
            const m = members[i];
            if (!m.fullName || !m.email || !m.phone || !m.college || !m.year || !m.department) {
                return NextResponse.json(
                    { success: false, message: `Incomplete details for member ${i + 1}.` },
                    { status: 400 }
                );
            }
        }

        const amount = parseAmount(registrationFee ?? "");
        const leader = members[0];

        // Generate a unique order ID for this event registration
        const sanitizedSlug = eventSlug.replace(/[^a-zA-Z0-9_-]/g, "_");
        const orderId = `VH_EVT_${Date.now()}_${sanitizedSlug}`;

        // Save registration to DB (status = PENDING, transaction_id = Cashfree order_id)
        const { error: dbError } = await supabase.from("event_registrations").insert([
            {
                event_slug: eventSlug,
                event_name: eventName,
                team_name: teamName,
                transaction_id: orderId,
                registration_fee: registrationFee,
                members: members,
                email: leader.email,
                phone: leader.phone,
                status: "PENDING",
            },
        ]);

        if (dbError) {
            console.error("❌ Supabase insert error:", dbError);
            return NextResponse.json(
                { success: false, message: dbError.message || "Database error." },
                { status: 500 }
            );
        }

        // Derive base URL for return / notify URLs
        const protocol = req.headers.get("x-forwarded-proto") || "http";
        const host = req.headers.get("host");
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

        // Create Cashfree order
        const orderRequest = {
            order_amount: amount,
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: `CUST_${Date.now()}`,
                customer_phone: leader.phone,
                customer_email: leader.email,
                customer_name: leader.fullName,
            },
            order_meta: {
                // After payment, Cashfree redirects here — ?payment=success&order_id=<id>
                return_url: `${baseUrl}/event/${eventSlug}/register?payment=success&order_id={order_id}`,
                notify_url: `${baseUrl}/api/payment/webhook`,
            },
            order_note: `VANSH2K26 — ${eventName} Registration`,
        };

        const response = await cashfree.PGCreateOrder(orderRequest);

        return NextResponse.json({
            success: true,
            payment_session_id: response.data.payment_session_id,
            order_id: response.data.order_id,
        });
    } catch (error: any) {
        console.error("❌ Create Event Order Error:", error.response?.data || error.message);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create payment order.",
                error: error.response?.data?.message || error.message,
            },
            { status: 500 }
        );
    }
}
