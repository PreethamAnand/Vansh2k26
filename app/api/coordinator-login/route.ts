import { NextResponse } from "next/server";
import { getCoordinatorCredentials } from "@/lib/coordinatorCredentials";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const username = typeof body?.username === "string" ? body.username.trim() : "";
        const password = typeof body?.password === "string" ? body.password.trim() : "";

        if (!username || !password) {
            return NextResponse.json({ ok: false, message: "Missing credentials" }, { status: 400 });
        }

        const credentials = getCoordinatorCredentials();
        if (!credentials.length) {
            return NextResponse.json(
                { ok: false, message: "Coordinator login is not configured yet. Please contact admin." },
                { status: 503 }
            );
        }

        const matched = credentials.find(
            (item) => item.username.toLowerCase() === username.toLowerCase() && item.password === password
        );

        if (!matched) {
            return NextResponse.json({ ok: false, message: "Invalid ID or Password. Please check your credentials." }, { status: 401 });
        }

        return NextResponse.json({
            ok: true,
            coordinatorName: matched.coordinatorName,
            eventName: matched.eventName,
            eventSlug: matched.eventSlug,
        });
    } catch {
        return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
    }
}
