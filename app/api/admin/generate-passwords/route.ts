import { NextResponse } from 'next/server';
import { teamSupabase as supabase } from '@/lib/supabase';

/**
 * Password formula: first 2 UPPERCASE letters of each member's name joined with "-"
 * then @VH26-[TEAM_NUMBER]
 * Example: members ["Rahul Verma", "Ankit Kumar", "Priya Nair"], team 101
 *          â†’ RA-AN-PR@VH26-101
 */
function generatePasswordFromMembers(members: any[], teamNum: number): string {
    const initials = members
        .map((m: any) => {
            const name: string = typeof m === 'string' ? m : (m.fullName || m.name || '');
            return name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();
        })
        .filter(Boolean)
        .join('-');

    return `${initials}@VH26-${teamNum}`;
}

export async function POST() {
    try {
        // Fetch all registrations including members
        const { data: teams, error: fetchError } = await supabase
            .from('registrations')
            .select('transaction_id, team_id, team_name, members');

        if (fetchError) {
            return NextResponse.json({ error: 'Failed to fetch teams', details: fetchError.message }, { status: 500 });
        }

        if (!teams || teams.length === 0) {
            return NextResponse.json({ success: true, updated: 0, message: 'No teams found' });
        }

        let updatedCount = 0;
        const errors: string[] = [];

        for (const team of teams) {
            if (!team.team_id) continue;

            // Extract team number from team_id like "VANSH2K26_101"
            const parts = team.team_id.split('_');
            const teamNum = parseInt(parts[parts.length - 1]);
            if (isNaN(teamNum)) continue;

            const members = Array.isArray(team.members) ? team.members : [];
            const password = generatePasswordFromMembers(members, teamNum);

            const { error: updateError } = await supabase
                .from('registrations')
                .update({ password })
                .eq('transaction_id', team.transaction_id);

            if (updateError) {
                errors.push(`Failed for ${team.transaction_id}: ${updateError.message}`);
            } else {
                updatedCount++;
            }
        }

        return NextResponse.json({
            success: true,
            updated: updatedCount,
            errors: errors.length > 0 ? errors : undefined,
            message: `Successfully set passwords for ${updatedCount} teams.`
        });

    } catch (error: any) {
        console.error('âŒ Generate passwords error:', error);
        return NextResponse.json({ success: false, error: error.message || String(error) }, { status: 500 });
    }
}

