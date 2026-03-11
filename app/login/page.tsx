"use client";

import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase, teamSupabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ─── Constants ───────────────────────────────────────────────────────────────
const ADMIN_ID = "admin@vhack";
const ADMIN_PASS = "@Snapx1911";

// ─── Main Login Page ─────────────────────────────────────────────────────────
export default function LoginPage() {
    const { user, isLoading, login } = useAuth();
    const router = useRouter();

    const [loginId, setLoginId] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [detectedRole, setDetectedRole] = useState<string | null>(null);

    // Redirect if already logged in
    useEffect(() => {
        if (!isLoading && user && user.role) {
            router.push(`/dashboard/${user.role}`);
        }
    }, [user, isLoading, router]);

    if (isLoading || (user && user.role)) {
        return (
            <div className="min-h-screen bg-[#06000D] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const handleSubmit = async () => {
        setError("");
        const id = loginId.trim();
        const pass = loginPass.trim();

        if (!id) { setError("Please enter your ID"); return; }
        if (!pass) { setError("Please enter your password"); return; }

        setIsVerifying(true);

        try {
            // ── 1. Admin check ──────────────────────────────────────────────
            if (id.toLowerCase() === ADMIN_ID.toLowerCase()) {
                if (pass === ADMIN_PASS) {
                    setDetectedRole("Admin");
                    login('admin', { id: ADMIN_ID });
                } else {
                    setError("Invalid Admin password");
                }
                return;
            }

            // ── 2. Team check ───────────────────────────────────────────────
            const { data: teamData } = await teamSupabase
                .from('registrations')
                .select('team_id, team_name, password')
                .ilike('team_id', id)
                .eq('password', pass)
                .maybeSingle();

            if (teamData) {
                setDetectedRole("Team");
                login('team', { teamId: teamData.team_id, name: teamData.team_name });
                return;
            }

            // ── 3. Judge check ──────────────────────────────────────────────
            const { data: judgeData } = await supabase
                .from('judges')
                .select('*')
                .ilike('generated_id', id)
                .eq('password', pass)
                .maybeSingle();

            if (judgeData) {
                setDetectedRole("Judge");
                login('judge', { id: judgeData.generated_id, name: judgeData.name });
                return;
            }

            // ── 4. Volunteer check ──────────────────────────────────────────
            const { data: volData } = await supabase
                .from('volunteers')
                .select('*')
                .ilike('generated_id', id)
                .eq('password', pass)
                .maybeSingle();

            if (volData) {
                setDetectedRole("Volunteer");
                login('volunteer', { id: volData.generated_id, name: volData.name });
                return;
            }

            // ── Nothing matched ─────────────────────────────────────────────
            setError("Invalid ID or Password. Please check your credentials.");

        } catch (err) {
            console.error("Login error:", err);
            setError("System error. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#06000D] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[160px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-600/10 blur-[160px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-3 text-white">
                        VHACK <span className="text-[#FFEE00]">PORTAL</span>
                    </h1>
                    <p className="text-white/40 font-medium text-sm">
                        Enter your credentials to access your dashboard
                    </p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md shadow-2xl relative overflow-hidden"
                >
                    {/* Card glow */}
                    <div className="absolute top-0 right-0 w-56 h-56 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/8 blur-[60px] rounded-full pointer-events-none" />

                    <div className="relative z-10 space-y-5">


                        {/* ID Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">
                                Your ID
                            </label>
                            <input
                                type="text"
                                id="login-id"
                                autoComplete="username"
                                placeholder=""
                                value={loginId}
                                onChange={(e) => { setLoginId(e.target.value); setError(""); }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFEE00]/50 focus:bg-white/[0.08] transition-all font-bold"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="login-pass"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={loginPass}
                                    onChange={(e) => { setLoginPass(e.target.value); setError(""); }}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFEE00]/50 focus:bg-white/[0.08] transition-all font-bold pr-14"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center"
                            >
                                <p className="text-red-400 text-xs font-bold uppercase tracking-wide">{error}</p>
                            </motion.div>
                        )}

                        {/* Detected role indicator */}
                        {detectedRole && !error && (
                            <div className="flex items-center justify-center gap-2">
                                <ShieldCheck size={14} className="text-green-400" />
                                <span className="text-green-400 text-xs font-bold uppercase tracking-widest">
                                    {detectedRole} verified — redirecting...
                                </span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isVerifying}
                            className={`w-full py-5 rounded-2xl font-black uppercase italic tracking-widest transition-all shadow-[0_4px_0_#9333ea] active:shadow-none active:translate-y-1 flex items-center justify-center gap-2 group mt-2 ${isVerifying
                                ? 'bg-[#FFEE00]/50 text-black/50 cursor-not-allowed'
                                : 'bg-[#FFEE00] hover:bg-[#E6D600] text-black'
                                }`}
                        >
                            {isVerifying ? (
                                <>
                                    <div className="w-5 h-5 border-[3px] border-black/30 border-t-black rounded-full animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <span>Access Dashboard</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {/* Credentials hint */}
                        <div className="pt-2 border-t border-white/5">
                            <p className="text-center text-white/20 text-[9px] uppercase tracking-widest font-bold">
                                Contact the organizer if you don&apos;t have credentials
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/30 hover:text-[#FFEE00] hover:bg-white/10 hover:border-[#FFEE00]/20 transition-all font-black uppercase italic text-[10px] tracking-[0.2em] group backdrop-blur-md"
                    >
                        <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Back to Landing Page
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
