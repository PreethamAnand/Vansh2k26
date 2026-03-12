"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "next-view-transitions";
import { Lock, Eye, EyeOff, User, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FlowField from "@/components/ui/flow-field";
import { COORDINATOR_CREDENTIALS } from "@/lib/coordinatorCredentials";

// ─── Constants ───────────────────────────────────────────────────────────────
const SUPERADMIN_ID = "superadmin@VANSH";
const SUPERADMIN_PASS = "@Snapx1911";
const ADMIN_ID = "admin@VANSH";
const ADMIN_PASS = "@Snapx1911";

export default function LoginPage() {
    const { user, isLoading, login } = useAuth();
    const router = useRouter();

    const [loginId, setLoginId]           = useState("");
    const [loginPass, setLoginPass]       = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError]               = useState("");
    const [isVerifying, setIsVerifying]   = useState(false);
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
            // ── 1. Super Admin check ────────────────────────────────────────
            if (id.toLowerCase() === SUPERADMIN_ID.toLowerCase()) {
                if (pass === SUPERADMIN_PASS) {
                    setDetectedRole("Super Admin");
                    login('superadmin', { id: SUPERADMIN_ID, name: "Super Administrator" });
                } else {
                    setError("Invalid Super Admin password");
                }
                return;
            }

            // ── 2. Admin check ──────────────────────────────────────────────
            if (id.toLowerCase() === ADMIN_ID.toLowerCase()) {
                if (pass === ADMIN_PASS) {
                    setDetectedRole("Admin");
                    login('admin', { id: ADMIN_ID });
                } else {
                    setError("Invalid Admin password");
                }
                return;
            }

            // ── 3. Event Coordinator credentials (individual) ───────────────
            const matchedCoordinator = COORDINATOR_CREDENTIALS.find(
                (item) => item.username.toLowerCase() === id.toLowerCase() && item.password === pass
            );

            if (matchedCoordinator) {
                setDetectedRole(`${matchedCoordinator.coordinatorName} (${matchedCoordinator.eventName})`);
                login("event-coordinator", {
                    id: matchedCoordinator.username,
                    name: matchedCoordinator.coordinatorName,
                    eventSlug: matchedCoordinator.eventSlug,
                });
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
        <FlowField className="min-h-screen">
            <main className="min-h-screen relative overflow-hidden w-full">

                <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] items-center px-4 py-8 sm:px-6 lg:px-10">
                    <div className="relative w-full rounded-[3rem] border border-white/10 bg-black/8 p-3 sm:p-4 backdrop-blur-[1px]">
                        <div className="pointer-events-none absolute -left-12 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-purple-500/14 blur-2xl" />
                        <div className="pointer-events-none absolute -right-10 top-20 h-32 w-32 rounded-full bg-cyan-400/14 blur-2xl" />
                        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_0.95fr]">
                    {/* Left video panel for desktop */}
                    <div className="relative hidden lg:block h-[82vh] overflow-hidden rounded-[2.5rem] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
                        <video
                            autoPlay
                            muted
                            playsInline
                            className="absolute inset-0 h-full w-full object-contain"
                        >
                            <source src="/Logo_Animation_With_Light_Sweep.mov" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/18" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(6,0,13,0.45)_100%)]" />
                    </div>

                    {/* Top video panel for mobile/tablet */}
                    <div className="relative lg:hidden h-64 overflow-hidden rounded-[2rem] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <video
                            autoPlay
                            muted
                            playsInline
                            className="absolute inset-0 h-full w-full object-contain"
                        >
                            <source src="/Logo_Animation_With_Light_Sweep.mov" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/18" />
                    </div>

                    {/* Right login panel */}
                    <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full max-w-[560px] mx-auto lg:mx-0 lg:justify-self-end rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                    >
                {/* ── Card top: login image background + Vignan logo ── */}
                <div className="relative h-56 md:h-64 flex flex-col items-center justify-center gap-3 overflow-hidden bg-[#20033a]">
                    <img
                        src="/login_image.jpeg"
                        alt="Login Banner"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                    
                    
                </div>

                {/* ── Card bottom: form ── */}
                <div className="bg-white/[0.06] backdrop-blur-2xl border-x border-b border-white/10 px-7 pt-6 pb-8">
                    <h2 className="text-center text-white font-kanit font-black text-2xl uppercase italic tracking-tight mb-1">
                        Portal Login
                    </h2>
                    <p className="text-center text-white/35 text-[10px] uppercase tracking-widest font-bold mb-5">
                        Use your assigned credentials to continue
                    </p>

                    <div className="space-y-3">
                        {/* ID / Username */}
                        <div className="relative">
                            <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none" />
                            <input
                                type="text"
                                id="login-id"
                                autoComplete="username"
                                placeholder="Enter your login ID"
                                value={loginId}
                                onChange={(e) => { setLoginId(e.target.value); setError(""); }}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                className="w-full bg-white/8 border border-white/12 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-purple-500/60 focus:bg-white/12 transition-all font-semibold"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="login-pass"
                                autoComplete="current-password"
                                placeholder="Password"
                                value={loginPass}
                                onChange={(e) => { setLoginPass(e.target.value); setError(""); }}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                className="w-full bg-white/8 border border-white/12 rounded-2xl pl-10 pr-12 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-purple-500/60 focus:bg-white/12 transition-all font-semibold"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {/* Remember me row */}
                        <div className="flex items-center justify-between px-1 pt-0.5">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-9 h-5 bg-white/10 rounded-full border border-white/15 peer-checked:bg-purple-600 transition-colors" />
                                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                                </div>
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest group-hover:text-white/70 transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <span className="text-[10px] text-purple-400/70 font-bold uppercase tracking-widest cursor-default select-none">
                                Forgot password?
                            </span>
                        </div>

                        {/* Error message */}
                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center text-red-400 text-[10px] font-bold uppercase tracking-wide"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Success indicator */}
                        <AnimatePresence>
                            {detectedRole && !error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck size={13} className="text-green-400" />
                                    <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">
                                        {detectedRole} verified — redirecting...
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Login button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isVerifying}
                            className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-2 mt-1 ${
                                isVerifying
                                    ? "bg-purple-800/60 text-white/50 cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white shadow-[0_4px_20px_rgba(109,40,217,0.5)] hover:shadow-[0_4px_28px_rgba(109,40,217,0.7)] active:scale-[0.98]"
                            }`}
                        >
                            {isVerifying ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Verifying...
                                </>
                            ) : "Login"}
                        </button>

                        {/* Back link */}
                        <div className="text-center pt-1">
                            <Link
                                href="/"
                                className="text-[10px] text-white/30 hover:text-white/70 font-bold uppercase tracking-widest transition-colors"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
                    </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </FlowField>
    );
}
