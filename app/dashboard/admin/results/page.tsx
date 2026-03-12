"use client";

import { MessageSquare, X, Search, Trophy, Download } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useHackathon, Project } from "@/context/HackathonContext";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STATIC_ROUNDS_CONFIG } from "@/lib/constants";

export default function AdminResults() {
    const { projects, eliminateTeam, judges } = useHackathon();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [evalFilter, setEvalFilter] = useState<{ roundId: string, type: 'single' | 'both' | 'pending' } | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const calculateAverage = useMemo(() => (p: Project, roundIds: string[] = ['round1', 'round2', 'round3', 'round4']) => {
        if (!p.roundScores) return 0;
        let sum = 0;
        roundIds.forEach(rid => {
            const judgeScores = p.roundScores?.[rid] || {};
            const scores = Object.values(judgeScores);
            if (scores.length > 0) {
                const avg = scores.reduce((s: number, val) => s + (Number(val) || 0), 0) / scores.length;
                sum += avg;
            }
        });
        return Number(sum.toFixed(2));
    }, []);

    const filteredProjects = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        let filtered = projects;

        if (query) {
            filtered = projects.filter(p => {
                const matchesName = (p.name || "").toLowerCase().includes(query);
                const matchesTeam = (p.team || "").toLowerCase().includes(query);
                const matchesId = (p.teamId || "").toLowerCase().includes(query);
                const isNumeric = /^\d+$/.test(query);
                const matchesPrefixId = isNumeric && (p.teamId || "").toLowerCase().includes(`vh-${query}`);

                return matchesName || matchesTeam || matchesId || matchesPrefixId;
            });
        }

        if (evalFilter) {
            filtered = filtered.filter(p => {
                if (p.isEliminated) return false;
                const evaluations = Object.keys(p.roundScores?.[evalFilter.roundId] || {}).length;
                if (evalFilter.type === 'single') return evaluations === 1;
                if (evalFilter.type === 'both') return evaluations >= 2;
                if (evalFilter.type === 'pending') return evaluations === 0;
                return true;
            });
        }


        // Sort by Average Score (Descending)
        return [...filtered].sort((a, b) => {
            return calculateAverage(b) - calculateAverage(a);
        });
    }, [projects, searchQuery, evalFilter, calculateAverage]);

    const getRankDisplay = (index: number) => {
        if (index === 0) return { emoji: "ðŸ¥‡", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" };
        if (index === 1) return { emoji: "ðŸ¥ˆ", color: "text-slate-300", bg: "bg-slate-400/10 border-slate-400/30" };
        if (index === 2) return { emoji: "ðŸ¥‰", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" };
        return { emoji: null, color: "text-white/20", bg: "bg-white/5 border-white/10" };
    };

    // Unified branded export: pass which rounds to include and whether to add feedback columns
    const exportRounds = (roundIds: string[], withFeedback: boolean, reportTitle: string) => {
        const ROUNDS = STATIC_ROUNDS_CONFIG.filter(r => roundIds.includes(r.id));
        const thStyle = 'border:1px solid #aaa;padding:7px 8px;font-size:10px;text-align:center;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;background:#1a1a8c;color:#fff;word-break:break-word;';
        const tdStyle = 'border:1px solid #ccc;padding:6px 8px;font-size:11px;text-align:center;vertical-align:top;';

        // Calculate max evaluations per round to define column structure
        const roundMaxEvals: Record<string, number> = {};
        ROUNDS.forEach(r => {
            let maxCount = 1;
            filteredProjects.forEach(p => {
                const count = Object.keys(p.roundScores?.[r.id] || {}).length;
                if (count > maxCount) maxCount = count;
            });
            roundMaxEvals[r.id] = maxCount;
        });

        // Header row 1: round group spans
        const roundGroupHeaders = ROUNDS.map(r => {
            const count = roundMaxEvals[r.id];
            const span = withFeedback ? count * 2 : count;
            return `<th colspan="${span}" style="${thStyle}background:#dde4f7;color:#1a1a8c;">${r.title} â€” ${r.subtitle}</th>`;
        }).join('');

        // Header row 2: Evaluation Slots
        const subHeaderCells = ROUNDS.flatMap(r => {
            const count = roundMaxEvals[r.id];
            const cells = [];
            for (let i = 1; i <= count; i++) {
                cells.push(`<th style="${thStyle}background:#eef0f8;min-width:100px;">Evaluator ${i}</th>`);
                if (withFeedback) {
                    cells.push(`<th style="${thStyle}background:#f5f5fc;min-width:150px;">Feedback ${i}</th>`);
                }
            }
            return cells;
        }).join('');

        const thead = `
            <tr>
                <th rowspan="2" style="${thStyle}width:36px;">#</th>
                <th rowspan="2" style="${thStyle}min-width:130px;">Project Name</th>
                <th rowspan="2" style="${thStyle}">Team</th>
                <th rowspan="2" style="${thStyle}">ID</th>
                <th rowspan="2" style="${thStyle}">Track</th>
                ${roundGroupHeaders}
                <th rowspan="2" style="${thStyle}background:#cc0000;min-width:60px;">Avg. Score</th>
                <th rowspan="2" style="${thStyle}">Status</th>
            </tr>
            <tr>${subHeaderCells}</tr>`;

        // Data rows
        const rows = filteredProjects.map((p, idx) => {
            const finalAvg = calculateAverage(p, roundIds);
            const roundCells = ROUNDS.flatMap(r => {
                const evaluations = Object.entries(p.roundScores?.[r.id] || {});
                const count = roundMaxEvals[r.id];
                const cells = [];

                for (let i = 0; i < count; i++) {
                    const [jid, score] = evaluations[i] || [null, null];
                    const comment = p.roundComments?.[r.id]?.[jid as string] || '';
                    const detailed = (p.roundDetailedScores?.[r.id]?.[jid as string]) || {};
                    const judgeName = judges.find(j => j.generatedId === jid)?.name || jid || 'â€”';

                    const criteriaBreakdown = score != null ? ROUNDS.find(rr => rr.id === r.id)!.criteria
                        .map(c => `${c.label}: ${(detailed as any)[c.id] ?? 'â€”'}`).join(' | ') : 'No evaluation yet';

                    const maxMarksForRound = r.criteria.length * 5;
                    const percentage = score != null ? Number(score) / maxMarksForRound : 0;
                    const cellBg = score == null ? '#f9f9f9' : percentage >= 0.8 ? '#efffef' : percentage >= 0.6 ? '#fffde7' : '#fff0f0';

                    const scoreCell = `<td style="${tdStyle}background:${cellBg};">
                        ${score != null
                            ? `<div style="font-size:8px;color:#888;font-weight:700;margin-bottom:2px;text-transform:uppercase;">${judgeName}</div>
                               <strong style="font-size:13px;color:#1a1a8c;">${Number(score).toFixed(1)}</strong>
                               <div style="font-size:8px;color:#555;margin-top:2px;line-height:1.1;">${criteriaBreakdown.substring(0, 60)}${criteriaBreakdown.length > 60 ? 'â€¦' : ''}</div>`
                            : '<span style="color:#ccc;">â€”</span>'}
                    </td>`;
                    cells.push(scoreCell);

                    if (withFeedback) {
                        const feedbackCell = `<td style="${tdStyle}text-align:left;background:#fffef9;max-width:150px;">
                            ${comment ? `<div style="font-size:8px;color:#888;margin-bottom:2px;">FROM: ${judgeName}</div>
                                        <span style="font-size:10px;color:#555;font-style:italic;line-height:1.4;">${comment.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`
                                : '<span style="color:#ddd;font-size:10px;">â€”</span>'}
                        </td>`;
                        cells.push(feedbackCell);
                    }
                }
                return cells;
            }).join('');
            const rowBg = idx % 2 === 0 ? '#fff' : '#f7f8fc';
            const statusColor = p.isEliminated ? '#cc0000' : '#1a7a1a';
            return `<tr style="background:${rowBg};">
                <td style="${tdStyle}font-weight:700;">${idx + 1}</td>
                <td style="${tdStyle}text-align:left;font-weight:600;">${p.name || 'â€”'}</td>
                <td style="${tdStyle}text-align:left;font-size:10px;">${p.team || 'â€”'}</td>
                <td style="${tdStyle}font-family:monospace;font-size:10px;">${p.teamId || 'â€”'}</td>
                <td style="${tdStyle}font-size:10px;">${p.track || 'â€”'}</td>
                ${roundCells}
                <td style="${tdStyle}font-weight:900;font-size:13px;color:${finalAvg > 0 ? '#1a1a8c' : '#aaa'};">${finalAvg > 0 ? finalAvg : 'â€”'}</td>
                <td style="${tdStyle}font-weight:700;color:${statusColor};font-size:10px;">${p.isEliminated ? 'Eliminated' : 'Active'}</td>
            </tr>`;
        }).join('');

        // Averages footer
        const avgCells = ROUNDS.flatMap(r => {
            const count = roundMaxEvals[r.id];
            const cells = [];
            for (let i = 0; i < count; i++) {
                cells.push(`<td style="${tdStyle}font-weight:700;color:#999;font-size:9px;">AVG</td>`);
                if (withFeedback) cells.push(`<td style="${tdStyle}"></td>`);
            }
            return cells;
        }).join('');
        const overallAvg = filteredProjects.length > 0
            ? (filteredProjects.reduce((s, p) => s + calculateAverage(p, roundIds), 0) / filteredProjects.length).toFixed(2) : 'â€”';
        const tfoot = `<tr style="background:#e8eaf6;">
            <td colspan="5" style="padding:7px;font-size:11px;font-weight:700;text-align:right;border:1px solid #ccc;">Column Averages â†’</td>
            ${avgCells}
            <td style="${tdStyle}font-weight:900;color:#1a1a8c;">${overallAvg}</td>
            <td style="${tdStyle}"></td>
        </tr>`;

        const now = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        const feedbackNote = withFeedback
            ? 'Each judge has a Score column + Feedback column'
            : 'Score columns only â€” no feedback included';

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>VANSH2K26 â€” ${reportTitle}</title>
    <style>
        @page { size: A2 landscape; margin: 12mm; }
        @media print { .no-print { display:none!important; } body { margin:0; } tr { page-break-inside:avoid; } }
        body { font-family:'Segoe UI',Arial,sans-serif; background:#fff; margin:0; }
        table { border-collapse:collapse; width:100%; }
    </style>
</head>
<body>
    <div class="no-print" style="position:fixed;top:0;left:0;right:0;background:#1a1a8c;color:#fff;
        padding:10px 24px;display:flex;justify-content:space-between;align-items:center;z-index:9999;font-family:Arial,sans-serif;">
        <span style="font-weight:700;font-size:13px;">ðŸ“Š VANSH2K26 â€” ${reportTitle} (${filteredProjects.length} Teams)</span>
        <button onclick="window.print()" style="background:#FFEE00;color:#000;border:none;padding:8px 22px;
            border-radius:6px;font-weight:900;font-size:13px;cursor:pointer;">ðŸ–¨ï¸ Print / Save as PDF</button>
    </div>
    <div style="padding:18px 24px;margin-top:50px;">
        <div style="display:flex;align-items:center;justify-content:flex-start;gap:20px;margin-bottom:8px;">
            <img src="/vignan-logo.png" style="height:80px;object-fit:contain;flex-shrink:0;" />
            <div style="font-family:'Segoe UI',Arial,sans-serif;">
                <div style="font-size:11px;color:#333;letter-spacing:0.5px;font-weight:700;">Vignan Institute of Technology and Science</div>
                <div style="font-size:22px;font-weight:900;letter-spacing:3px;color:#1a1a8c;margin-top:4px;">VANSH2K26 HACKATHON</div>
                <div style="font-size:13px;font-weight:700;letter-spacing:4px;color:#cc0000;margin-top:2px;">${reportTitle.toUpperCase()}</div>
                <div style="font-size:10px;color:#888;margin-top:5px;">Date: ${now} &nbsp;|&nbsp; Total Teams: ${filteredProjects.length}</div>
            </div>
        </div>
        <div style="height:3px;background:linear-gradient(90deg,#cc0000,#1a1a8c,#cc0000);margin:8px 0 14px;border-radius:2px;"></div>
        <div style="display:flex;gap:14px;font-size:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <span style="font-weight:700;color:#555;">Score (out of 5):</span>
            <span style="background:#efffef;border:1px solid #9d9;padding:2px 8px;border-radius:3px;">4â€“5 Excellent</span>
            <span style="background:#fffde7;border:1px solid #dd9;padding:2px 8px;border-radius:3px;">3â€“4 Good</span>
            <span style="background:#fff0f0;border:1px solid #fcc;padding:2px 8px;border-radius:3px;">1â€“3 Needs Work</span>
            <span style="color:#999;font-style:italic;">${feedbackNote}</span>
        </div>
        <table><thead>${thead}</thead><tbody>${rows}</tbody><tfoot>${tfoot}</tfoot></table>
        <div style="margin-top:14px;text-align:center;font-size:9px;color:#bbb;border-top:1px solid #eee;padding-top:8px;">
            VANSH2K26 Hackathon &nbsp;|&nbsp; Vignan Institute of Technology and Science &nbsp;|&nbsp; ${reportTitle} &nbsp;|&nbsp; Generated: ${now}
        </div>
    </div>
</body>
</html>`;
        const win = window.open('', '_blank');
        if (win) { win.document.write(html); win.document.close(); }
    };


    const handleExportPDF = () => {
        const ROUNDS = STATIC_ROUNDS_CONFIG;
        const thStyle = 'border:1px solid #aaa;padding:7px 8px;font-size:10px;text-align:center;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;word-break:break-word;';
        const tdStyle = 'border:1px solid #ccc;padding:6px 8px;font-size:11px;text-align:center;vertical-align:top;';

        // Collect all judge IDs per round across all teams
        const roundJudgeMap: Record<string, string[]> = {};
        ROUNDS.forEach(r => {
            const judgeSet = new Set<string>();
            filteredProjects.forEach(p => {
                Object.keys(p.roundScores?.[r.id] || {}).forEach(jid => judgeSet.add(jid));
            });
            roundJudgeMap[r.id] = Array.from(judgeSet);
        });

        // Build grouped header row 1 (round names)
        // Each round has 2 sub-cols per judge: Score | Feedback
        const roundGroupHeaders = ROUNDS.map(r => {
            const judgeCount = Math.max(roundJudgeMap[r.id].length, 1);
            const span = judgeCount * 2; // score + feedback per judge
            return `<th colspan="${span}" style="${thStyle};background:#dde4f7;color:#1a1a8c;">${r.title} â€” ${r.subtitle}</th>`;
        }).join('');

        // Build header row 2: for each judge â†’ "Score" + "Feedback" columns
        const subHeaderCells = ROUNDS.flatMap(r =>
            roundJudgeMap[r.id].length === 0
                ? [
                    `<th style="${thStyle};background:#f0f0f0;">Score</th>`,
                    `<th style="${thStyle};background:#f0f0f0;">Feedback</th>`
                ]
                : roundJudgeMap[r.id].flatMap(jid => {
                    const jname = judges.find(j => j.generatedId === jid)?.name || jid;
                    return [
                        `<th style="${thStyle};background:#eef0f8;">Score<br/><span style="font-weight:400;font-size:9px;color:#1a1a8c;">${jname}</span></th>`,
                        `<th style="${thStyle};background:#f5f5fc;">Feedback<br/><span style="font-weight:400;font-size:9px;color:#888;">${jname}</span></th>`
                    ];
                })
        ).join('');

        const thead = `
            <tr>
                <th rowspan="2" style="${thStyle};background:#1a1a8c;color:#fff;width:36px;">#</th>
                <th rowspan="2" style="${thStyle};background:#1a1a8c;color:#fff;min-width:130px;">Project Name</th>
                <th rowspan="2" style="${thStyle};background:#1a1a8c;color:#fff;">Team</th>
                <th rowspan="2" style="${thStyle};background:#1a1a8c;color:#fff;">ID</th>
                <th rowspan="2" style="${thStyle};background:#1a1a8c;color:#fff;">Track</th>
                ${roundGroupHeaders}
                <th rowspan="2" style="${thStyle};background:#cc0000;color:#fff;">Average Score</th>
                <th rowspan="2" style="${thStyle};background:#1a1a8c;color:#fff;">Status</th>
            </tr>
            <tr>${subHeaderCells}</tr>`;

        // Build data rows
        const rows = filteredProjects.map((p, idx) => {
            const finalAvg = calculateAverage(p, ROUNDS.map(r => r.id));
            const roundCells = ROUNDS.flatMap(r => {
                const judgeIds = roundJudgeMap[r.id];
                if (judgeIds.length === 0) return [
                    `<td style="${tdStyle}">â€”</td>`,
                    `<td style="${tdStyle}">â€”</td>`
                ];
                return judgeIds.flatMap(jid => {
                    const score = p.roundScores?.[r.id]?.[jid];
                    const comment = p.roundComments?.[r.id]?.[jid] || '';
                    const detailed = (p.roundDetailedScores?.[r.id]?.[jid]) || {};
                    const criteriaBreakdown = ROUNDS.find(rr => rr.id === r.id)!.criteria
                        .map(c => `${c.label}: ${(detailed as any)[c.id] ?? 'â€”'}`).join(' | ');
                    const maxMarksForRound = r.criteria.length * 5;
                    const percentage = score != null ? Number(score) / maxMarksForRound : 0;
                    const cellBg = score == null ? '#f9f9f9' : percentage >= 0.8 ? '#efffef' : percentage >= 0.6 ? '#fffde7' : '#fff0f0';

                    const scoreCell = `<td style="${tdStyle}background:${cellBg};" title="${criteriaBreakdown}">
                        ${score != null
                            ? `<strong style="font-size:14px;color:#1a1a8c;">${Number(score).toFixed(1)}</strong><br/>
                               <span style="font-size:9px;color:#888;">${criteriaBreakdown.replace(/\|/g, 'Â·').substring(0, 80)}${criteriaBreakdown.length > 80 ? 'â€¦' : ''}</span>`
                            : '<span style="color:#ccc;">â€”</span>'}
                    </td>`;

                    const feedbackCell = `<td style="${tdStyle}text-align:left;background:#fffef9;max-width:160px;">
                        ${comment
                            ? `<span style="font-size:10px;color:#555;font-style:italic;line-height:1.4;">${comment.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`
                            : '<span style="color:#ddd;font-size:10px;">â€”</span>'}
                    </td>`;

                    return [scoreCell, feedbackCell];
                });
            }).join('');

            const rowBg = idx % 2 === 0 ? '#fff' : '#f7f8fc';
            const statusColor = p.isEliminated ? '#cc0000' : '#1a7a1a';
            return `<tr style="background:${rowBg};">
                <td style="${tdStyle}font-weight:700;">${idx + 1}</td>
                <td style="${tdStyle}text-align:left;font-weight:600;">${p.name || 'â€”'}</td>
                <td style="${tdStyle}text-align:left;font-size:10px;">${p.team || 'â€”'}</td>
                <td style="${tdStyle}font-family:monospace;font-size:10px;">${p.teamId || 'â€”'}</td>
                <td style="${tdStyle}font-size:10px;">${p.track || 'â€”'}</td>
                ${roundCells}
                <td style="${tdStyle}font-weight:900;font-size:13px;color:${finalAvg > 0 ? '#1a1a8c' : '#aaa'};">${finalAvg > 0 ? finalAvg : 'â€”'}</td>
                <td style="${tdStyle}font-weight:700;color:${statusColor};font-size:10px;">${p.isEliminated ? 'Eliminated' : 'Active'}</td>
            </tr>`;
        }).join('');

        // Build averages footer row (only over score columns, skip feedback columns)
        const avgCells = ROUNDS.flatMap(r => {
            const judgeIds = roundJudgeMap[r.id];
            if (judgeIds.length === 0) return [
                `<td style="${tdStyle}">â€”</td>`,
                `<td style="${tdStyle}"></td>`
            ];
            return judgeIds.flatMap(jid => {
                const scores = filteredProjects
                    .map(p => p.roundScores?.[r.id]?.[jid])
                    .filter(s => s != null).map(Number);
                const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 'â€”';
                return [
                    `<td style="${tdStyle}font-weight:700;">${avg}</td>`,
                    `<td style="${tdStyle}"></td>`
                ];
            });
        }).join('');
        const overallAvg = filteredProjects.length > 0
            ? (filteredProjects.reduce((s, p) => s + calculateAverage(p, ROUNDS.map(r => r.id)), 0) / filteredProjects.length).toFixed(2) : 'â€”';
        const tfoot = `<tr style="background:#e8eaf6;">
            <td colspan="5" style="padding:7px;font-size:11px;font-weight:700;text-align:right;border:1px solid #ccc;">Column Averages â†’</td>
            ${avgCells}
            <td style="${tdStyle}font-weight:900;color:#1a1a8c;">${overallAvg}</td>
            <td style="${tdStyle}"></td>
        </tr>`;

        const now = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>VANSH2K26 â€” Evaluation Score Sheet</title>
    <style>
        @page { size: A2 landscape; margin: 12mm; }
        @media print {
            .no-print { display: none !important; }
            body { margin: 0; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; }
        }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; margin: 0; }
        table { border-collapse: collapse; width: 100%; }
    </style>
</head>
<body>
    <div class="no-print" style="position:fixed;top:0;left:0;right:0;background:#1a1a8c;color:#fff;
        padding:10px 24px;display:flex;justify-content:space-between;align-items:center;z-index:9999;font-family:Arial,sans-serif;">
        <span style="font-weight:700;font-size:13px;">ðŸ“Š VANSH2K26 â€” Evaluation Score Sheet (${filteredProjects.length} Teams)</span>
        <button onclick="window.print()" style="background:#FFEE00;color:#000;border:none;padding:8px 22px;
            border-radius:6px;font-weight:900;font-size:13px;cursor:pointer;">ðŸ–¨ï¸ Print / Save as PDF</button>
    </div>

    <div style="padding:18px 24px;margin-top:50px;">
        <!-- Letterhead with Vignan Logo -->
        <div style="display:flex;align-items:center;justify-content:flex-start;gap:20px;margin-bottom:8px;">
            <img src="/vignan-logo.png" style="height:80px;object-fit:contain;flex-shrink:0;" />
            <div style="font-family:'Segoe UI',Arial,sans-serif;">
                <div style="font-size:11px;color:#333;letter-spacing:0.5px;font-weight:700;">
                    Vignan Institute of Technology and Science
                </div>
                <div style="font-size:22px;font-weight:900;letter-spacing:3px;color:#1a1a8c;margin-top:4px;">VANSH2K26 HACKATHON</div>
                <div style="font-size:13px;font-weight:700;letter-spacing:5px;color:#cc0000;margin-top:2px;">EVALUATION SCORE SHEET</div>
                <div style="font-size:10px;color:#888;margin-top:5px;">Date: ${now} &nbsp;|&nbsp; Total Teams: ${filteredProjects.length}</div>
            </div>
        </div>
        <div style="height:3px;background:linear-gradient(90deg,#cc0000,#1a1a8c,#cc0000);margin:8px 0 14px;border-radius:2px;"></div>

        <!-- Legend -->
        <div style="display:flex;gap:14px;font-size:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <span style="font-weight:700;color:#555;">Score (out of 5):</span>
            <span style="background:#efffef;border:1px solid #9d9;padding:2px 8px;border-radius:3px;">4â€“5 Excellent</span>
            <span style="background:#fffde7;border:1px solid #dd9;padding:2px 8px;border-radius:3px;">3â€“4 Good</span>
            <span style="background:#fff0f0;border:1px solid #fcc;padding:2px 8px;border-radius:3px;">1â€“3 Needs Work</span>
            <span style="color:#999;font-style:italic;">Each judge has a Score column + Feedback column</span>
        </div>

        <!-- Main Table -->
        <table>
            <thead>${thead}</thead>
            <tbody>${rows}</tbody>
            <tfoot>${tfoot}</tfoot>
        </table>

        <div style="margin-top:14px;text-align:center;font-size:9px;color:#bbb;border-top:1px solid #eee;padding-top:8px;">
            VANSH2K26 Hackathon &nbsp;|&nbsp; Vignan Institute of Technology and Science &nbsp;|&nbsp; Evaluation Score Sheet &nbsp;|&nbsp; Generated: ${now}
        </div>
    </div>
</body>
</html>`;

        const win = window.open('', '_blank');
        if (win) { win.document.write(html); win.document.close(); }
    };

    const roundStats = useMemo(() => {
        return STATIC_ROUNDS_CONFIG.map(round => {
            let singleJudge = 0;
            let bothJudges = 0;
            let notEvaluated = 0;

            projects.forEach(p => {
                if (p.isEliminated) return;
                const evaluations = Object.keys(p.roundScores?.[round.id] || {}).length;
                if (evaluations === 1) singleJudge++;
                else if (evaluations >= 2) bothJudges++;
                else notEvaluated++;
            });

            return {
                id: round.id,
                title: round.title,
                color: round.color,
                singleJudge,
                bothJudges,
                notEvaluated,
                total: singleJudge + bothJudges + notEvaluated
            };
        });
    }, [projects]);

    return (
        <DashboardLayout type="admin" title="Leaderboard & Feedback">
            {/* Quick Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {roundStats.map((stat) => (
                    <div key={stat.id} className={`bg-white/5 border rounded-3xl p-5 backdrop-blur-md relative overflow-hidden group transition-all ${evalFilter?.roundId === stat.id ? 'border-[#FFEE00]/50 ring-1 ring-[#FFEE00]/20' : 'border-white/10 hover:border-white/20'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${stat.color}`}>{stat.title}</span>
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-white/20">
                                {stat.total}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => setEvalFilter(evalFilter?.roundId === stat.id && evalFilter.type === 'both' ? null : { roundId: stat.id, type: 'both' })}
                                className={`w-full flex justify-between items-end p-1 rounded-lg transition-all ${evalFilter?.roundId === stat.id && evalFilter.type === 'both' ? 'bg-green-500/10' : 'hover:bg-white/5'}`}
                            >
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Both Judges</span>
                                    <span className="text-xl font-black italic text-white leading-none">{stat.bothJudges}</span>
                                </div>
                                <div className="h-1 flex-1 mx-4 bg-white/5 rounded-full overflow-hidden mb-1.5">
                                    <div
                                        className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                                        style={{ width: `${stat.total > 0 ? (stat.bothJudges / stat.total) * 100 : 0}%` }}
                                    />
                                </div>
                                <span className="text-[10px] font-black text-green-500/80">{stat.total > 0 ? (stat.bothJudges / stat.total * 100).toFixed(0) : 0}%</span>
                            </button>

                            <button
                                onClick={() => setEvalFilter(evalFilter?.roundId === stat.id && evalFilter.type === 'single' ? null : { roundId: stat.id, type: 'single' })}
                                className={`w-full flex justify-between items-end p-1 rounded-lg transition-all ${evalFilter?.roundId === stat.id && evalFilter.type === 'single' ? 'bg-[#FFEE00]/10' : 'hover:bg-white/5'}`}
                            >
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Single Judge</span>
                                    <span className="text-xl font-black italic text-white/80 leading-none">{stat.singleJudge}</span>
                                </div>
                                <div className="h-1 flex-1 mx-4 bg-white/5 rounded-full overflow-hidden mb-1.5">
                                    <div
                                        className="h-full bg-[#FFEE00]"
                                        style={{ width: `${stat.total > 0 ? (stat.singleJudge / stat.total) * 100 : 0}%` }}
                                    />
                                </div>
                                <span className="text-[10px] font-black text-[#FFEE00]/80">{stat.total > 0 ? (stat.singleJudge / stat.total * 100).toFixed(0) : 0}%</span>
                            </button>

                            <button
                                onClick={() => setEvalFilter(evalFilter?.roundId === stat.id && evalFilter.type === 'pending' ? null : { roundId: stat.id, type: 'pending' })}
                                className={`w-full flex justify-between items-end p-1 rounded-lg transition-all ${evalFilter?.roundId === stat.id && evalFilter.type === 'pending' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            >
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Pending</span>
                                    <span className="text-xl font-black italic text-white/40 leading-none">{stat.notEvaluated}</span>
                                </div>
                                <div className="h-1 flex-1 mx-4 bg-white/5 rounded-full overflow-hidden mb-1.5">
                                    <div
                                        className="h-full bg-white/10"
                                        style={{ width: `${stat.total > 0 ? (stat.notEvaluated / stat.total) * 100 : 0}%` }}
                                    />
                                </div>
                                <span className="text-[10px] font-black text-white/20">{stat.total > 0 ? (stat.notEvaluated / stat.total * 100).toFixed(0) : 0}%</span>
                            </button>
                        </div>

                        {evalFilter?.roundId === stat.id && (
                            <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#FFEE00] text-black px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter shadow-lg scale-110">
                                Filter Active
                                <X size={10} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setEvalFilter(null); }} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-6 md:p-10 backdrop-blur-md relative overflow-hidden">

                {/* Header Row */}
                <div className="flex flex-col gap-4 mb-6">

                    {/* Row 1: Title + Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFEE00]/10 border border-[#FFEE00]/20 flex items-center justify-center">
                                <Trophy className="text-[#FFEE00]" size={22} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
                                    Evaluation Grid
                                </h2>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-0.5">
                                    {filteredProjects.length} of {projects.length} teams
                                </p>
                            </div>
                        </div>

                        {/* Search & Active Filter */}
                        <div className="flex flex-col md:flex-row items-center gap-3">

                            {evalFilter && (
                                <button
                                    onClick={() => setEvalFilter(null)}
                                    className="px-4 py-3 rounded-2xl bg-[#FFEE00]/10 border border-[#FFEE00]/30 text-[#FFEE00] text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#FFEE00]/20 transition-all animate-in fade-in zoom-in h-[46px]"
                                >
                                    <X size={14} />
                                    Filtered: {STATIC_ROUNDS_CONFIG.find(r => r.id === evalFilter.roundId)?.title} ({evalFilter.type})
                                </button>
                            )}
                            <div className="relative w-full md:w-72">
                                <input
                                    ref={searchRef}
                                    type="text"
                                    placeholder="Search team, name, or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-black/30 border border-white/10 rounded-2xl py-3.5 pl-11 pr-10 text-white font-bold text-xs focus:outline-none focus:border-[#FFEE00]/50 focus:bg-black/40 transition-all placeholder:text-white/20 uppercase tracking-wide h-[46px]"
                                />
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                {searchQuery && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            searchRef.current?.focus();
                                        }}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                                    >
                                        <X size={12} className="text-white/60" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Export Navbar â€” full width */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 backdrop-blur-md gap-1 overflow-x-auto custom-scrollbar">
                        {[
                            { label: 'Round 1', rounds: ['round1'], title: 'Round 1 â€” Evaluation Report', accent: false },
                            { label: 'Round 2', rounds: ['round2'], title: 'Round 2 â€” Evaluation Report', accent: false },
                            { label: 'Round 3', rounds: ['round3'], title: 'Round 3 â€” Evaluation Report', accent: false },
                            { label: 'Round 4', rounds: ['round4'], title: 'Round 4 â€” Evaluation Report', accent: false },
                            { label: 'R1 + R2 + R3', rounds: ['round1', 'round2', 'round3'], title: 'Rounds 1, 2 & 3 â€” Evaluation Report', accent: false },
                            { label: 'R2 + R3', rounds: ['round2', 'round3'], title: 'Rounds 2 & 3 â€” Evaluation Report', accent: false },
                            { label: 'R1 + R2', rounds: ['round1', 'round2'], title: 'Rounds 1 & 2 â€” Evaluation Report', accent: false },
                            { label: 'Export All', rounds: ['round1', 'round2', 'round3', 'round4'], title: 'Full Evaluation â€” All Rounds', accent: true },
                        ].map(({ label, rounds, title, accent }) => (
                            <button
                                key={label}
                                onClick={() => exportRounds(rounds, false, title)}
                                className={accent
                                    ? "flex-1 flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#FFEE00] text-black hover:bg-yellow-300 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 whitespace-nowrap"
                                    : "flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 whitespace-nowrap"
                                }
                            >
                                {!accent && <Download size={10} />} {label}
                            </button>
                        ))}
                    </div>
                </div>





                {/* Table */}
                <div className="overflow-x-auto custom-scrollbar rounded-2xl">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead className="sticky top-0 z-10">
                            <tr className="border-b border-white/10 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] bg-[#0B0114]/80 backdrop-blur-md">
                                <th className="py-4 px-4 w-16">Rank</th>
                                <th className="py-4 px-4">Team Details</th>
                                <th className="py-4 px-4 text-center">Round 01 (30)</th>
                                <th className="py-4 px-4 text-center">Round 02 (20)</th>
                                <th className="py-4 px-4 text-center">Round 03 (20)</th>
                                <th className="py-4 px-4 text-center">Round 04 (30)</th>
                                <th className="py-4 px-4 text-center text-white/40">Avg. Score</th>
                                <th className="py-4 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredProjects.length === 0 ? (
                                    <tr>
                                        <td colSpan={8}>
                                            <div className="py-20 flex flex-col items-center justify-center text-center">
                                                <Search size={40} className="text-white/10 mb-4" />
                                                <p className="text-white/20 font-black text-sm uppercase tracking-widest">
                                                    No teams found
                                                </p>
                                                <p className="text-white/10 text-xs mt-2">
                                                    Try a different search term
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProjects.map((p, index) => {
                                        const rank = getRankDisplay(index);
                                        const finalAvg = calculateAverage(p);

                                        return (
                                            <motion.tr
                                                key={p.id}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: index * 0.03, duration: 0.2 }}
                                                className={`border-b border-white/5 hover:bg-white/[0.04] transition-colors group ${p.isEliminated ? 'opacity-30 grayscale' : ''}`}
                                            >
                                                {/* Rank */}
                                                <td className="py-5 px-4">
                                                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-sm font-black ${rank.bg}`}>
                                                        {rank.emoji ? (
                                                            <span className="text-base leading-none">{rank.emoji}</span>
                                                        ) : (
                                                            <span className={`text-xs ${rank.color}`}>#{index + 1}</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Team Info */}
                                                <td className="py-5 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center font-black italic text-white/60 border border-white/10 text-sm shrink-0">
                                                            {(p.name || "?")[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-white text-sm uppercase italic tracking-tight leading-tight">{p.name}</div>
                                                            <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-0.5">{p.team} â€¢ {p.teamId}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Round Scores */}
                                                <td className="py-5 px-4 text-center">
                                                    <ScorePill value={p.roundScores?.['round1']} judges={judges} color="text-blue-400" />
                                                </td>
                                                <td className="py-5 px-4 text-center">
                                                    <ScorePill value={p.roundScores?.['round2']} judges={judges} color="text-pink-400" />
                                                </td>
                                                <td className="py-5 px-4 text-center">
                                                    <ScorePill value={p.roundScores?.['round3']} judges={judges} color="text-yellow-400" />
                                                </td>
                                                <td className="py-5 px-4 text-center">
                                                    <ScorePill value={p.roundScores?.['round4']} judges={judges} color="text-purple-400" />
                                                </td>

                                                {/* Average Score (Total) */}
                                                <td className="py-5 px-4 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <div className={`font-mono text-lg font-black ${finalAvg > 0 ? 'text-white' : 'text-white/20'}`}>
                                                            {finalAvg > 0 ? finalAvg.toFixed(1) : '-'}
                                                        </div>
                                                        {finalAvg > 0 && (
                                                            <div className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em] -mt-1">
                                                                / 100 pts
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="py-5 px-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setSelectedProject(p)}
                                                            className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/10 opacity-0 group-hover:opacity-100"
                                                            title="View Feedback"
                                                        >
                                                            <MessageSquare size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => eliminateTeam(p.id)}
                                                            className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${p.isEliminated
                                                                ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500 hover:text-white'
                                                                : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100'
                                                                }`}
                                                        >
                                                            {p.isEliminated ? 'Reinstate' : 'Eliminate'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Results Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#06000D]/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#0B0114] border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-[#0B0114]">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFEE00] mb-1">Evaluation Details</div>
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">{selectedProject.name}</h3>
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white/40 uppercase tracking-widest">ID: {selectedProject.teamId}</span>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedProject(null)} className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/40">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-6">
                                {STATIC_ROUNDS_CONFIG.map((round) => {
                                    const roundJudgeScores = selectedProject.roundScores[round.id] || {};
                                    const roundJudgeComments = selectedProject.roundComments?.[round.id] || {};
                                    const roundJudgeDetailed = selectedProject.roundDetailedScores?.[round.id] || {};
                                    const judgeIds = Object.keys(roundJudgeScores);

                                    return (
                                        <div key={round.id} className="bg-white/5 rounded-3xl p-6 border border-white/5 flex flex-col gap-6">
                                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg bg-opacity-20 flex items-center justify-center text-[10px] font-black text-white italic ${round.bg}`}>
                                                        {round.id.slice(-1).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-black uppercase tracking-widest text-white/60 block leading-none">{round.title}</span>
                                                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{round.subtitle}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {judgeIds.length === 0 ? (
                                                <div className="py-4 text-center text-white/20 text-[10px] uppercase font-black">No evaluations yet</div>
                                            ) : (
                                                <div className="space-y-8">
                                                    {judgeIds.map((jid) => {
                                                        const judgeName = judges.find(j => j.generatedId === jid)?.name || jid;
                                                        const score = roundJudgeScores[jid];
                                                        const comment = roundJudgeComments[jid];
                                                        const detailed = roundJudgeDetailed[jid] || {};

                                                        return (
                                                            <div key={jid} className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                                                    <span className="text-[10px] font-black uppercase text-[#FFEE00]">Judge: {judgeName}</span>
                                                                    <span className="text-xs font-black text-white italic">Score: {score}</span>
                                                                </div>

                                                                {/* Detailed Breakdown */}
                                                                <div className="space-y-2">
                                                                    {round.criteria.map((c) => (
                                                                        <div key={c.id} className="flex items-center justify-between group">
                                                                            <span className="text-[9px] font-bold text-white/30 uppercase">{c.label}</span>
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="h-0.5 w-8 bg-white/5 rounded-full overflow-hidden">
                                                                                    <div className="h-full bg-purple-500" style={{ width: `${(detailed[c.id] || 0) * 20}%` }} />
                                                                                </div>
                                                                                <span className="text-[10px] font-black italic text-white/60">{detailed[c.id] || '-'}</span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                {/* Comment */}
                                                                {comment && (
                                                                    <div className="pt-2 border-t border-white/5">
                                                                        <p className="text-white/60 text-[10px] italic leading-relaxed">"{comment}"</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="p-8 border-t border-white/10 bg-[#0B0114] flex justify-end">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl transition-all"
                                >
                                    Close Intelligence
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}

// Helper component for score pills
function ScorePill({ value, color, judges }: { value: Record<string, number | null> | undefined | null; color: string; judges: any[] }) {
    if (!value || Object.keys(value).length === 0) {
        return <span className="text-white/15 font-mono text-xs font-bold">â€”</span>;
    }
    const judgeIds = Object.keys(value);

    return (
        <div className="flex flex-col items-center gap-1.5 min-w-[85px] py-1">
            {judgeIds.map(jid => {
                const judgeName = judges.find(j => j.generatedId === jid)?.name || jid;
                const score = value[jid];
                return (
                    <div key={jid} className="flex items-center justify-between w-full px-2 py-1 bg-white/[0.03] rounded-lg border border-white/5 hover:bg-white/[0.08] transition-colors">
                        <span className={`font-mono text-xs font-black ${color}`}>{Number(score).toFixed(1)}</span>
                        <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter bg-white/5 px-1.5 py-0.5 rounded border border-white/10">{judgeName}</span>
                    </div>
                );
            })}
        </div>
    );
}

