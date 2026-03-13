import { NextResponse } from "next/server";
import { teamSupabase as supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { eventSlug, eventName, teamName, transactionId, members, registrationFee } = body;

        if (!eventSlug || !eventName || !teamName || !transactionId || !members?.length) {
            return NextResponse.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        // Validate basic member shape
        for (const m of members) {
            if (!m.fullName || !m.email || !m.phone || !m.college || !m.year || !m.department) {
                return NextResponse.json(
                    { success: false, message: "Incomplete member details." },
                    { status: 400 }
                );
            }
        }

        const { error } = await supabase.from("event_registrations").insert([
            {
                event_slug: eventSlug,
                event_name: eventName,
                team_name: teamName,
                transaction_id: transactionId,
                registration_fee: registrationFee,
                members: members,
                email: members[0].email,
                phone: members[0].phone,
                status: "PENDING",
            },
        ]);

        if (error) {
            console.error("❌ Supabase insert error:", error);
            return NextResponse.json(
                { success: false, message: error.message || "Database error." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: "Registration submitted successfully." });
    } catch (err: any) {
        console.error("❌ Event register route error:", err);
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}
