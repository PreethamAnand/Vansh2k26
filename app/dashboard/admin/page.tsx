"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import {
    Users,
    ShieldCheck,
    Phone,
    Wifi,
    Trash2,
    Plus,
    ExternalLink,
    Code,
    Presentation,
    Play,
    Globe,
    Search,
    MapPin,
    AlertTriangle,
    Save,
    UserCog,
    Lock,
    Eye,
    EyeOff,
    Download,
    XCircle
} from "lucide-react";
import { toast } from "sonner";
import { useState, useMemo, useEffect, useRef } from "react";
import { useHackathon, Project } from "@/context/HackathonContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
    const {
        projects,
        eliminateTeam,
        updateTeamLogistics,
        isLoading,
        judges,
        addJudge,
        removeJudge,
        volunteers,
        addVolunteer,
        removeVolunteer,
        wifiNetworks,
        addWifiNetwork,
        removeWifiNetwork,
        rooms,
        addRoom,
        removeRoom,
        emergencyContact,
        updateEmergencyContact
    } = useHackathon();

    const [activeTab, setActiveTab] = useState<'teams' | 'judges' | 'volunteers' | 'wifi' | 'rooms' | 'eliminate'>('teams');
    const [searchQuery, setSearchQuery] = useState("");
    const [showLogisticsModal, setShowLogisticsModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Project | null>(null);
    const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);
    const [emergencyForm, setEmergencyForm] = useState({ name: "", phone: "" });
    const [isEditingEmergency, setIsEditingEmergency] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState<Set<any>>(new Set());

    // Silent one-time backfill: if any team has no password OR has old-format password (no '@'), regenerate all
    const backfillRan = useRef(false);
    useEffect(() => {
        if (isLoading) return; // Wait until data is loaded
        if (backfillRan.current) return; // Only run once per session
        if (projects.length === 0) return;
        // Old format: VH26-TEAMNAME-101 (no '@')
        // New format: RA-AN-PR@VH26-101 (has '@')
        const needsUpdate = projects.some(p => !p.password || !p.password.includes('@'));
        if (!needsUpdate) return; // All passwords already in new format
        backfillRan.current = true;
        console.log(`ðŸ”‘ Detected old/missing passwords â€” regenerating with new member-initials formula...`);
        fetch('/api/admin/generate-passwords', { method: 'POST' })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    console.log(`âœ… Passwords updated for ${data.updated} teams. Refreshing...`);
                    window.location.reload();
                }
            })
            .catch(err => console.error('Password backfill failed:', err));
    }, [projects, isLoading]);

    const togglePasswordVisibility = (teamId: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setVisiblePasswords(prev => {
            const next = new Set(prev);
            if (next.has(teamId)) next.delete(teamId);
            else next.add(teamId);
            return next;
        });
    };

    const [newJudge, setNewJudge] = useState({ name: "", specialization: "" });
    const [newVolunteer, setNewVolunteer] = useState({ name: "", phone: "", role: "" });
    const [newWifi, setNewWifi] = useState({ ssid: "", pass: "" });
    const [newRoom, setNewRoom] = useState({ name: "", capacity: "" });
    const [localLogistics, setLocalLogistics] = useState({
        room: "",
        volunteer_name: "",
        volunteer_phone: "",
        roomWifiSSID: "",
        roomWifiPass: ""
    });

    const handleOpenLogistics = (team: Project) => {
        setSelectedTeam(team);
        setLocalLogistics({
            room: team.room || "",
            volunteer_name: team.coordinator?.name || "",
            volunteer_phone: team.coordinator?.phone || "",
            roomWifiSSID: team.roomWifiSSID || "",
            roomWifiPass: team.roomWifiPass || ""
        });
        setShowLogisticsModal(true);
    };

    const handleSaveLogistics = () => {
        if (selectedTeam) {
            updateTeamLogistics(selectedTeam.id, localLogistics);
            setShowLogisticsModal(false);
        }
    };

    const handleVerifyPayment = async (transactionId?: string) => {
        if (!transactionId) {
            toast.error("No Transaction ID found for this team.");
            return;
        }

        const loadingToast = toast.loading("Verifying Payment & Sending Email...");

        try {
            const response = await fetch('/api/admin/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transactionId })
            });
            const data = await response.json();

            if (data.success) {
                toast.success("Payment Verified! Confirmation Email Sent.");
                // Ideally update context, but reload works for now to sync everything
                setTimeout(() => window.location.reload(), 1500);
            } else {
                toast.error("Verification Failed: " + data.message);
            }
        } catch (error) {
            toast.error("Network Error during verification");
        } finally {
            toast.dismiss(loadingToast);
        }
    };


    const filteredTeams = useMemo(() => {
        return projects.filter(p => {
            const query = searchQuery.toLowerCase().trim();
            if (!query) return true;

            const teamName = (p.team || "Unknown Team").toLowerCase();
            const captainName = (p.captain || "N/A").toLowerCase();

            const matchesTeam = teamName.includes(query);
            const matchesId = (p.teamId || "").toLowerCase().includes(query);
            const matchesCaptain = captainName.includes(query);

            // Handle numeric-only search (e.g., "101" -> matches "VH-101")
            const isNumeric = /^\d+$/.test(query);
            const matchesPrefixId = isNumeric && (p.teamId || "").toLowerCase().includes(`vh-${query}`);

            return matchesTeam || matchesId || matchesCaptain || matchesPrefixId;
        });
    }, [projects, searchQuery]);

    // Shared branded report opener
    const openBrandedReport = (title: string, subtitle: string, headers: string[], rows: (string | number | undefined | null)[][], filename: string) => {
        const now = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        const thS = 'border:1px solid #aaa;padding:8px 10px;font-size:11px;text-align:center;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;background:#1a1a8c;color:#fff;';
        const tdS = 'border:1px solid #ccc;padding:7px 10px;font-size:11px;text-align:left;vertical-align:top;';
        const headerRow = `<tr>${headers.map(h => `<th style="${thS}">${h}</th>`).join('')}</tr>`;
        const dataRows = rows.map((row, i) =>
            `<tr style="background:${i % 2 === 0 ? '#fff' : '#f7f8fc'};">${row.map(cell => `<td style="${tdS}">${cell ?? 'â€”'}</td>`).join('')}</tr>`
        ).join('');

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>VANSH2K26 â€” ${title}</title>
    <style>
        @page { size: A3 landscape; margin: 12mm; }
        @media print { .no-print { display: none !important; } body { margin: 0; } tr { page-break-inside: avoid; } }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; margin: 0; }
        table { border-collapse: collapse; width: 100%; }
    </style>
</head>
<body>
    <div class="no-print" style="position:fixed;top:0;left:0;right:0;background:#1a1a8c;color:#fff;
        padding:10px 24px;display:flex;justify-content:space-between;align-items:center;z-index:9999;font-family:Arial,sans-serif;">
        <span style="font-weight:700;font-size:13px;">ðŸ“‹ VANSH2K26 â€” ${title} (${rows.length} records)</span>
        <button onclick="window.print()" style="background:#FFEE00;color:#000;border:none;padding:8px 22px;
            border-radius:6px;font-weight:900;font-size:13px;cursor:pointer;">ðŸ–¨ï¸ Print / Save as PDF</button>
    </div>
    <div style="padding:18px 24px;margin-top:50px;">
        <div style="display:flex;align-items:center;justify-content:flex-start;gap:20px;margin-bottom:8px;">
            <img src="/vignan-logo.png" style="height:80px;object-fit:contain;flex-shrink:0;" />
            <div style="font-family:'Segoe UI',Arial,sans-serif;">
                <div style="font-size:11px;color:#333;letter-spacing:0.5px;font-weight:700;">Vignan Institute of Technology and Science</div>
                <div style="font-size:22px;font-weight:900;letter-spacing:3px;color:#1a1a8c;margin-top:4px;">VANSH2K26 HACKATHON</div>
                <div style="font-size:13px;font-weight:700;letter-spacing:5px;color:#cc0000;margin-top:2px;">${title.toUpperCase()}</div>
                <div style="font-size:10px;color:#888;margin-top:5px;">Date: ${now} &nbsp;|&nbsp; ${subtitle}: ${rows.length}</div>
            </div>
        </div>
        <div style="height:3px;background:linear-gradient(90deg,#cc0000,#1a1a8c,#cc0000);margin:8px 0 14px;border-radius:2px;"></div>
        <table><thead>${headerRow}</thead><tbody>${dataRows}</tbody></table>
        <div style="margin-top:14px;text-align:center;font-size:9px;color:#bbb;border-top:1px solid #eee;padding-top:8px;">
            VANSH2K26 Hackathon &nbsp;|&nbsp; Vignan Institute of Technology and Science &nbsp;|&nbsp; ${title} &nbsp;|&nbsp; Generated: ${now}
        </div>
    </div>
</body>
</html>`;
        const win = window.open('', '_blank');
        if (win) { win.document.write(html); win.document.close(); }
    };

    const handleExportTeams = () => {
        const headers = ["Team Name", "Team ID", "Track", "College", "Captain", "Captain Mobile", "Status", "Room"];
        const rows = filteredTeams.map(t => [t.team, t.teamId, t.track, t.college, t.captain, t.captainMobile, t.status, t.room || "TBD"]);
        openBrandedReport("Team Registrations", "Total Teams", headers, rows, `teams_export_${new Date().toISOString().split('T')[0]}`);
    };

    const handleExportJudges = () => {
        const headers = ["Name", "Judge ID", "Specialization", "Password"];
        const rows = judges.map(j => [j.name, j.generatedId, j.specialization, j.password]);
        openBrandedReport("Judges Directory", "Total Judges", headers, rows, `judges_export_${new Date().toISOString().split('T')[0]}`);
    };

    const handleExportVolunteers = () => {
        const headers = ["Name", "Volunteer ID", "Phone", "Role", "Password"];
        const rows = volunteers.map(v => [v.name, v.generatedId, v.phone, v.role, v.password]);
        openBrandedReport("Volunteers Directory", "Total Volunteers", headers, rows, `volunteers_export_${new Date().toISOString().split('T')[0]}`);
    };

    const handleExportWifi = () => {
        const headers = ["SSID / Network Name", "Password"];
        const rows = wifiNetworks.map(w => [w.ssid, w.pass]);
        openBrandedReport("WiFi Networks", "Total Networks", headers, rows, `wifi_export_${new Date().toISOString().split('T')[0]}`);
    };

    const handleExportRooms = () => {
        const headers = ["Room Name", "Capacity"];
        const rows = rooms.map(r => [r.name, r.capacity]);
        openBrandedReport("Room Assignments", "Total Rooms", headers, rows, `rooms_export_${new Date().toISOString().split('T')[0]}`);
    };

    if (isLoading) {
        return (
            <DashboardLayout type="admin" title="Initializing Admin Grid...">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout type="admin" title="Command Center 2.0">
            {/* Navigation Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl w-full border border-white/10 backdrop-blur-md">
                {[
                    { id: 'teams', label: 'Registrations', icon: Users },
                    { id: 'judges', label: 'Judges', icon: ShieldCheck },
                    { id: 'volunteers', label: 'Volunteers', icon: Phone },
                    { id: 'wifi', label: 'WiFi', icon: Wifi },
                    { id: 'rooms', label: 'Rooms', icon: MapPin },
                    { id: 'eliminate', label: 'Eliminate', icon: XCircle }
                ].map((tab: { id: string, label: string, icon: any }) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[10px] lg:text-xs font-black uppercase italic tracking-widest transition-all ${activeTab === tab.id
                            ? 'bg-[#FFEE00] text-black shadow-[0_0_20px_rgba(255,238,0,0.3)]'
                            : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                            }`}
                    >
                        <tab.icon size={16} />
                        <span className="truncate">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Registrations Tab */}
            {activeTab === 'teams' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-4 mb-8 flex-wrap">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search by ID (e.g. 101) or Team Name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pl-14 text-white font-medium focus:outline-none focus:border-purple-500/50 transition-all h-16"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={24} />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 h-16 flex items-center gap-4">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Teams</span>
                            <span className="text-2xl font-black italic text-[#FFEE00]">{projects.length}</span>
                        </div>
                        <button
                            onClick={handleExportTeams}
                            className="bg-white/5 border border-white/20 text-white hover:text-[#FFEE00] hover:border-[#FFEE00]/50 rounded-2xl px-6 py-4 h-16 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                            <Download size={18} /> Export
                        </button>
                        <Link
                            href="/dashboard/admin/register"
                            className="bg-[#FFEE00] text-black rounded-2xl px-8 h-16 flex items-center gap-3 font-black uppercase italic tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,238,0,0.2)]"
                        >
                            <Plus size={20} /> Manual Register
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {filteredTeams.map((team) => (
                            <div
                                key={team.id}
                                className={`bg-white/5 border rounded-[2rem] transition-all hover:bg-white/[0.07] cursor-pointer overflow-hidden ${team.isEliminated ? 'border-red-500/30' : 'border-white/10'} ${expandedTeamId === team.id ? 'bg-white/[0.08] shadow-2xl' : 'opacity-80'}`}
                                onClick={() => setExpandedTeamId(expandedTeamId === team.id ? null : team.id)}
                            >
                                <div className="p-8">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black ${team.isEliminated ? 'bg-red-500/20 text-red-400' : 'bg-purple-600/20 text-purple-400'}`}>
                                                {team.team ? team.team[0] : "?"}
                                            </div>
                                            <div>
                                                <div className="flex items-center flex-wrap gap-2">
                                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">{team.team}</h3>
                                                    <span className="text-[10px] font-black text-[#FFEE00] px-2 py-0.5 border border-[#FFEE00]/30 rounded bg-[#FFEE00]/5">{team.teamId}</span>
                                                    {team.status === 'PENDING' && (
                                                        <span className="text-[8px] font-black bg-orange-500/20 text-orange-400 border border-orange-500/50 px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">
                                                            Verification Pending
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">{team.track} â€¢ {team.college}</p>
                                                {/* Password Badge */}
                                                <div className="flex items-center gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                                                    <Lock size={10} className="text-blue-400/60" />
                                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Password:</span>
                                                    <code className={`text-[11px] font-mono font-bold transition-all ${team.password
                                                        ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                                                        : 'text-white/20 bg-white/5 border border-white/10'
                                                        } px-2 py-0.5 rounded`}>
                                                        {team.password
                                                            ? (visiblePasswords.has(team.id) ? team.password : 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢')
                                                            : 'Not Set'}
                                                    </code>
                                                    {team.password && (
                                                        <button
                                                            onClick={(e) => togglePasswordVisibility(team.id, e)}
                                                            className="text-white/30 hover:text-blue-400 transition-colors"
                                                            title={visiblePasswords.has(team.id) ? 'Hide password' : 'Show password'}
                                                        >
                                                            {visiblePasswords.has(team.id) ? <EyeOff size={12} /> : <Eye size={12} />}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                                            {team.status === 'PENDING' && (
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-[#FFEE00]/10 border border-[#FFEE00] px-3 py-2 rounded-lg text-xs font-mono text-[#FFEE00] flex flex-col">
                                                        <span className="text-[8px] opacity-70 uppercase">Transaction ID</span>
                                                        <span className="font-bold">{team.transactionId || team.id}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleVerifyPayment(team.transactionId || team.id)}
                                                        className="px-4 py-3 rounded-xl bg-orange-500 text-white font-black uppercase italic text-[10px] tracking-widest shadow-lg hover:bg-orange-600 transition-all animate-pulse"
                                                    >
                                                        Verify Payment
                                                    </button>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-4">
                                                <button onClick={() => handleOpenLogistics(team)} className="px-6 py-3 rounded-xl bg-[#FFEE00] text-black font-black uppercase italic text-[10px] tracking-widest shadow-lg active:scale-95 transition-all">Assign Logistics</button>
                                                <button
                                                    onClick={() => eliminateTeam(team.id)}
                                                    className={`px-6 py-3 rounded-xl font-black uppercase italic text-[10px] tracking-widest border transition-all ${team.isEliminated ? 'bg-red-500 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-red-400'}`}
                                                >
                                                    {team.isEliminated ? 'Restore Team' : 'Eliminate Team'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedTeamId === team.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 mt-8 border-t border-white/5" onClick={(e) => e.stopPropagation()}>
                                                    {/* 1. Final Submissions */}
                                                    <div className="space-y-3">
                                                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2"><Globe size={10} /> Final Submissions</span>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {[
                                                                { label: 'GitHub', url: team.submission?.github, icon: Code },
                                                                { label: 'Pitch', url: team.submission?.presentation, icon: Presentation },
                                                                { label: 'Demo', url: team.submission?.demo, icon: Play },
                                                                { label: 'Live', url: team.submission?.deployment, icon: Globe }
                                                            ].map((link, idx) => {
                                                                const formattedUrl = link.url && !link.url.match(/^https?:\/\//)
                                                                    ? `https://${link.url}`
                                                                    : link.url;

                                                                return (
                                                                    <a
                                                                        key={idx}
                                                                        href={formattedUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${link.url ? 'bg-green-500/5 border-green-500/20 text-green-400 hover:bg-green-500/10' : 'bg-white/5 border-white/5 text-white/10 pointer-events-none'}`}
                                                                    >
                                                                        <link.icon size={14} />
                                                                        <span className="text-[8px] font-black uppercase">{link.label}</span>
                                                                    </a>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>

                                                    {/* 2. Logistics & Deployment */}
                                                    <div className="space-y-3">
                                                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2"><Wifi size={10} /> Room & Connectivity</span>
                                                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-[10px] text-white/40 font-bold uppercase">Room</span>
                                                                <span className="text-xs font-black text-white italic">{team.room || "TBD"}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-tight">Room WiFi</span>
                                                                <div className="text-right">
                                                                    <div className="text-[9px] font-black text-purple-400 italic">SSID: {team.roomWifiSSID || "N/A"}</div>
                                                                    <div className="text-[9px] font-black text-purple-400 italic">PASS: {team.roomWifiPass || "N/A"}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 4. Login Password */}
                                                    <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                                                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2"><Lock size={10} /> Login Password</span>
                                                        <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/20 space-y-3">
                                                            <div className="flex justify-between items-center gap-3">
                                                                <span className="text-[10px] text-white/40 font-bold uppercase shrink-0">Team Password</span>
                                                                <code className="text-xs font-mono font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded border border-blue-500/20">
                                                                    {team.password
                                                                        ? (visiblePasswords.has(team.id) ? team.password : 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢')
                                                                        : <span className="text-white/20 italic">Not Set</span>}
                                                                </code>
                                                                {team.password && (
                                                                    <button
                                                                        onClick={(e) => togglePasswordVisibility(team.id, e)}
                                                                        className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-blue-400 transition-colors"
                                                                    >
                                                                        {visiblePasswords.has(team.id) ? <EyeOff size={14} /> : <Eye size={14} />}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {!team.password && (
                                                            <p className="text-[9px] text-orange-400/70 font-bold uppercase tracking-wide">
                                                                âš  Set a password in Supabase for this team to enable login.
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Judges Tab */}
            {activeTab === 'judges' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Add Official Judge</h3>
                            <button
                                onClick={handleExportJudges}
                                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-[#FFEE00] hover:border-[#FFEE00]/50 transition-all flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"
                            >
                                <Download size={18} /> Export Judges CSV
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Full Name</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#FFEE00]"
                                    value={newJudge.name}
                                    placeholder="e.g. Dr. Smith"
                                    onChange={(e) => setNewJudge({ ...newJudge, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Specialization Domain</label>
                                <select
                                    className="w-full bg-[#0B0114] border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#FFEE00] appearance-none"
                                    value={newJudge.specialization}
                                    onChange={(e) => setNewJudge({ ...newJudge, specialization: e.target.value })}
                                >
                                    <option value="" disabled>Select Track</option>
                                    <option value="Agentic AI & Intelligent Automation">Agentic AI & Intelligent Automation</option>
                                    <option value="Cybersecurity and fintech">Cybersecurity and fintech</option>
                                    <option value="Blockchain / Web3 / IoT">Blockchain / Web3 / IoT</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        if (newJudge.name && newJudge.specialization) {
                                            addJudge(newJudge);
                                            setNewJudge({ name: "", specialization: "" });
                                        }
                                    }}
                                    className="w-full py-4 rounded-2xl bg-[#FFEE00] text-black font-black uppercase italic tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                                >
                                    <Plus size={18} /> Add Judicial POC
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-12 mb-6">
                            <div>
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Registered Evaluators</h3>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Total: {judges.length} Judges</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {judges.length === 0 ? (
                                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                    <p className="text-white/20 font-bold uppercase tracking-[0.3em] text-xs font-kanit">No Judges Assigned Yet</p>
                                </div>
                            ) : (
                                [...judges]
                                    .sort((a, b) => {
                                        const idA = parseInt(a.generatedId?.split("-")[1] || "0");
                                        const idB = parseInt(b.generatedId?.split("-")[1] || "0");
                                        return idA - idB;
                                    })
                                    .map((judge) => (
                                        <div key={judge.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400"><ShieldCheck size={24} /></div>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="text-lg font-black italic uppercase tracking-tight">{judge.name}</h4>
                                                        <span className="text-[9px] font-black text-[#FFEE00] px-2 py-0.5 border border-[#FFEE00]/30 rounded bg-[#FFEE00]/5">{judge.generatedId}</span>
                                                    </div>
                                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">{judge.specialization}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <span className="text-[9px] font-black text-white/20 uppercase block tracking-widest">Credentials</span>
                                                    <code className="text-[10px] font-mono text-purple-400 font-black">PASS: {judge.password}</code>
                                                </div>
                                                <button onClick={() => removeJudge(judge.id)} className="p-3 rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Volunteers Tab */}
            {activeTab === 'volunteers' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Assign Station Volunteer</h3>
                            <button
                                onClick={handleExportVolunteers}
                                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-[#FFEE00] hover:border-[#FFEE00]/50 transition-all flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"
                            >
                                <Download size={18} /> Export Volunteers
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Name</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none"
                                    value={newVolunteer.name}
                                    onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Phone</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none"
                                    value={newVolunteer.phone}
                                    onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Role</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none"
                                    value={newVolunteer.role}
                                    onChange={(e) => setNewVolunteer({ ...newVolunteer, role: e.target.value })}
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        if (newVolunteer.name && newVolunteer.phone) {
                                            addVolunteer(newVolunteer);
                                            setNewVolunteer({ name: "", phone: "", role: "" });
                                        }
                                    }}
                                    className="w-full py-4 rounded-2xl bg-[#FFEE00] text-black font-black uppercase italic tracking-widest flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} /> Register Staff
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {volunteers.length === 0 ? (
                                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                    <p className="text-white/20 font-bold uppercase tracking-[0.3em] text-xs font-kanit">No Volunteers Registered</p>
                                </div>
                            ) : (
                                volunteers.map((vol) => (
                                    <div key={vol.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400"><Users size={24} /></div>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-lg font-black italic uppercase tracking-tight">{vol.name}</h4>
                                                    <span className="text-[9px] font-black text-blue-400 px-2 py-0.5 border border-blue-400/30 rounded bg-blue-400/5">{vol.generatedId}</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">{vol.role} â€¢ {vol.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <span className="text-[9px] font-black text-white/20 uppercase block tracking-widest">Credentials</span>
                                                <code className="text-[10px] font-mono text-blue-400 font-black">PASS: {vol.password}</code>
                                            </div>
                                            <button onClick={() => removeVolunteer(vol.id)} className="p-3 rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* WiFi Tab */}
            {activeTab === 'wifi' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#FFEE00]">WiFi Network Management</h3>
                            <button
                                onClick={handleExportWifi}
                                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-[#FFEE00] hover:border-[#FFEE00]/50 transition-all flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"
                            >
                                <Download size={18} /> Export WiFi CSV
                            </button>
                        </div>

                        {/* Add WiFi Form */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Network Name (SSID)</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#FFEE00] transition-colors"
                                    value={newWifi.ssid}
                                    placeholder="e.g. vHack-Guest"
                                    onChange={(e) => setNewWifi({ ...newWifi, ssid: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Password</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#FFEE00] transition-colors"
                                    value={newWifi.pass}
                                    placeholder="e.g. securePass123"
                                    onChange={(e) => setNewWifi({ ...newWifi, pass: e.target.value })}
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        if (newWifi.ssid && newWifi.pass) {
                                            addWifiNetwork(newWifi);
                                            setNewWifi({ ssid: "", pass: "" });
                                        } else {
                                            toast.error("Please fill in both SSID and Password");
                                        }
                                    }}
                                    className="w-full py-4 rounded-2xl bg-[#FFEE00] text-black font-black uppercase italic tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,238,0,0.3)] hover:shadow-[0_0_30px_rgba(255,238,0,0.5)]"
                                >
                                    <Plus size={18} /> Add Network
                                </button>
                            </div>
                        </div >

                        {/* WiFi List */}
                        < div className="space-y-4" >
                            {
                                wifiNetworks.length === 0 ? (
                                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem] bg-black/20">
                                        <Wifi size={48} className="mx-auto text-white/10 mb-4" />
                                        <p className="text-white/20 font-black uppercase tracking-[0.2em] text-xs">No WiFi Networks Configured</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {wifiNetworks.map((net) => (
                                            <div key={net.id} className="relative p-6 bg-white/5 border border-white/10 rounded-[1.5rem] group hover:bg-white/[0.08] transition-all hover:border-white/20 overflow-hidden">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                                                            <Wifi size={20} />
                                                        </div>
                                                        <button
                                                            onClick={() => removeWifiNetwork(net.id)}
                                                            className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white transform group-hover:scale-110 active:scale-95"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-black italic uppercase tracking-tighter text-white truncate" title={net.ssid}>{net.ssid}</h4>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Key:</span>
                                                            <code className="text-[10px] font-mono text-[#FFEE00] font-bold bg-[#FFEE00]/10 px-2 py-1 rounded border border-[#FFEE00]/20 truncate">{net.pass}</code>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* Rooms Tab */}
            {activeTab === 'rooms' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#FFEE00]">Room Management</h3>
                            <button
                                onClick={handleExportRooms}
                                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-[#FFEE00] hover:border-[#FFEE00]/50 transition-all flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"
                            >
                                <Download size={18} /> Export Rooms CSV
                            </button>
                        </div>

                        {/* Add Room Form */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Room Name / Number</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#FFEE00] transition-colors"
                                    value={newRoom.name}
                                    placeholder="e.g. LAB 101"
                                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Capacity / Info</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#FFEE00] transition-colors"
                                    value={newRoom.capacity}
                                    placeholder="e.g. 50 pax or Projector Available"
                                    onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        if (newRoom.name && newRoom.capacity) {
                                            addRoom(newRoom);
                                            setNewRoom({ name: "", capacity: "" });
                                        } else {
                                            toast.error("Please fill in both Name and Capacity info");
                                        }
                                    }}
                                    className="w-full py-4 rounded-2xl bg-[#FFEE00] text-black font-black uppercase italic tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                                >
                                    <Plus size={18} /> Add Room
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {rooms.length === 0 ? (
                                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem] bg-black/20">
                                    <MapPin size={48} className="mx-auto text-white/10 mb-4" />
                                    <p className="text-white/20 font-black uppercase tracking-[0.2em] text-xs">No Rooms Configured</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {rooms.map((room) => (
                                        <div key={room.id} className="relative p-6 bg-white/5 border border-white/10 rounded-[1.5rem] group hover:bg-white/[0.08] transition-all hover:border-white/20 overflow-hidden">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                                        <MapPin size={20} />
                                                    </div>
                                                    <button onClick={() => removeRoom(room.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-black italic uppercase tracking-tighter text-white truncate">{room.name}</h4>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Details:</span>
                                                        <span className="text-[10px] font-bold text-white/60 truncate">{room.capacity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Eliminate Tab */}
            {activeTab === 'eliminate' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Elimination Console</h3>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Manage active and eliminated teams</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active</span>
                                <span className="text-2xl font-black italic text-green-400">{projects.filter(p => !p.isEliminated).length}</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Eliminated</span>
                                <span className="text-2xl font-black italic text-red-400">{projects.filter(p => p.isEliminated).length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative mb-8">
                        <input
                            type="text"
                            placeholder="Search team to eliminate/restore..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 pl-14 text-white font-medium focus:outline-none focus:border-red-500/50 transition-all"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={24} />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {filteredTeams.map((team) => (
                            <div
                                key={team.id}
                                className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${team.isEliminated
                                        ? 'bg-red-500/5 border-red-500/20'
                                        : 'bg-white/5 border-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${team.isEliminated ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                                        }`}>
                                        {team.team ? team.team[0] : "?"}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-xl font-black italic uppercase tracking-tighter text-white">{team.team}</h4>
                                            <span className="text-[10px] font-black text-white/40 px-2 py-0.5 border border-white/10 rounded">{team.teamId}</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">{team.track}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => eliminateTeam(team.id)}
                                    className={`px-8 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest transition-all ${team.isEliminated
                                            ? 'bg-white/10 text-white hover:bg-white/20'
                                            : 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                                        }`}
                                >
                                    {team.isEliminated ? 'Restore Team' : 'Eliminate team'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Logistics Modal */}
            <AnimatePresence>
                {showLogisticsModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogisticsModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#0B0114] border border-white/10 rounded-[3rem] p-8 lg:p-12 max-w-xl w-full relative z-10 text-white">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-8 text-[#FFEE00]">Deploy Team Logistics</h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-2">Assigned Room</label>
                                        <select className="w-full bg-[#0B0114] border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#FFEE00] appearance-none" value={localLogistics.room} onChange={(e) => setLocalLogistics({ ...localLogistics, room: e.target.value })}>
                                            <option value="">Select Room</option>
                                            {rooms.map(room => (<option key={room.id} value={room.name}>{room.name} ({room.capacity})</option>))}
                                            <option value="custom">Custom...</option>
                                        </select>
                                        {localLogistics.room === "custom" && (<input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none mt-2" onChange={(e) => setLocalLogistics({ ...localLogistics, room: e.target.value })} placeholder="Enter Room Name" />)}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-2">Assign Coordinator</label>
                                        <select className="w-full bg-[#0B0114] border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#FFEE00] appearance-none" value={localLogistics.volunteer_name} onChange={(e) => { const v = volunteers.find(v => v.name === e.target.value); setLocalLogistics({ ...localLogistics, volunteer_name: e.target.value, volunteer_phone: v?.phone || "" }); }}>
                                            <option value="">Select Volunteer</option>
                                            {volunteers.map(vol => (<option key={vol.id} value={vol.name}>{vol.name} ({vol.role})</option>))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-2">Select WiFi Network</label>
                                        <select className="w-full bg-[#0B0114] border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#FFEE00] appearance-none" value={localLogistics.roomWifiSSID} onChange={(e) => { const n = wifiNetworks.find(n => n.ssid === e.target.value); setLocalLogistics({ ...localLogistics, roomWifiSSID: n?.ssid || e.target.value, roomWifiPass: n?.pass || "" }); }}>
                                            <option value="">Select WiFi</option>
                                            {wifiNetworks.map(net => (<option key={net.id} value={net.ssid}>{net.ssid}</option>))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-2">WiFi Password</label>
                                        <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none" value={localLogistics.roomWifiPass} onChange={(e) => setLocalLogistics({ ...localLogistics, roomWifiPass: e.target.value })} placeholder="Enter Password" />
                                    </div>
                                </div>
                                <div className="pt-8 grid grid-cols-2 gap-4">
                                    <button onClick={() => setShowLogisticsModal(false)} className="py-4 rounded-2xl border border-white/10 font-black uppercase italic text-xs tracking-widest">Abort</button>
                                    <button onClick={handleSaveLogistics} className="py-4 rounded-2xl bg-[#FFEE00] text-black font-black uppercase italic text-xs tracking-widest shadow-lg active:scale-95 transition-all">Deploy Station Data</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}

