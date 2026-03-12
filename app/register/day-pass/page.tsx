"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, ArrowLeft, CheckCircle2, User } from "lucide-react";
import { WarpBackground } from "@/components/ui/warp-background";

interface AttendeeData {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    year: string;
    department: string;
}

function DayPassRegisterContent() {
    const REGISTRATIONS_OPEN = true;
    const initialAttendee: AttendeeData = {
        fullName: "",
        email: "",
        phone: "",
        college: "",
        year: "",
        department: ""
    };

    const [attendee, setAttendee] = useState<AttendeeData>(initialAttendee);
    const [transactionId, setTransactionId] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAttendeeChange = (field: keyof AttendeeData, value: string) => {
        setAttendee({ ...attendee, [field]: value });
    };

    const handleSubmit = async () => {
        const isIncomplete = !attendee.fullName || !attendee.email || !attendee.phone || !transactionId;

        if (isIncomplete) {
            toast.error("Please fill all required fields");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    passType: 'day',
                    attendee,
                    transactionId
                })
            });

            const data = await res.json();
            if (data.success) {
                setIsSubmitted(true);
                toast.success("Day Pass registration submitted!");
            } else {
                toast.error(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error submitting registration. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!REGISTRATIONS_OPEN && !isSubmitted) {
        return (
            <div className="min-h-screen bg-[#13001F] relative overflow-hidden font-poppins flex items-center justify-center p-4">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#62009B] opacity-20 blur-[120px] rounded-full" />
                    <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#A200FF] opacity-10 blur-[120px] rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full bg-[#1A002E]/80 backdrop-blur-xl border-2 border-white/10 rounded-[40px] p-10 md:p-16 text-center shadow-2xl relative"
                >
                    <h1 className="text-white text-4xl md:text-6xl font-kanit font-black uppercase italic mt-4 mb-6 leading-tight">
                        REGISTRATIONS <br />
                        <span className="text-[#FFEE00]">ARE CLOSED</span>
                    </h1>

                    <p className="text-white/60 text-lg md:text-xl font-poppins mb-10 leading-relaxed max-w-lg mx-auto">
                        The registration portal for DAY PASS is currently closed.
                    </p>

                    <Link href="/register" className="inline-flex items-center gap-2 bg-white/10 text-white font-kanit font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all border border-white/10">
                        <ArrowLeft className="w-5 h-5" /> BACK TO PASSES
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-black border-2 border-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 text-center shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                >
                    <CheckCircle2 className="w-20 h-20 text-white mx-auto mb-6 animate-pulse" />
                    <h2 className="text-white text-3xl font-kanit font-black mb-4 uppercase italic">Day Pass Registered!</h2>
                    <p className="text-white/70 font-poppins mb-8 leading-relaxed">
                        Your <span className="text-white font-bold">DAY PASS</span> registration has been submitted. <br />
                        <span className="text-xs mt-4 block">Check your email for the pass details and event information.</span>
                    </p>
                    <Link href="/" className="inline-block bg-white text-black font-kanit font-black px-10 py-4 rounded-full hover:bg-gray-200 transition-transform hover:scale-105 uppercase tracking-widest">
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <WarpBackground className="!p-0 !border-none !rounded-none min-h-screen bg-black" gridColor="rgba(255, 255, 255, 0.1)">
            <div className="font-poppins pt-24 pb-12 px-3 md:px-4 md:pt-36 md:pb-20">
            <div className="max-w-4xl mx-auto relative z-10">
                <Link href="/#event-passes" className="inline-flex items-center text-white font-kanit font-bold group text-sm md:text-base mb-6">
                    <ArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                    BACK TO PASSES
                </Link>

                <div className="bg-black backdrop-blur-xl border-2 border-white/10 rounded-[30px] md:rounded-[40px] p-5 md:p-10 shadow-2xl">
                    <div className="mb-8">
                        <span className="text-white font-kanit font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-sm block mb-1">DAY PASS</span>
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-kanit font-black uppercase italic leading-tight">
                            <span className="text-white">REGISTER</span> YOUR SPOT
                        </h1>
                        <p className="text-white/60 mt-3">Rs 299 (Early Bird) - Full day access to all main events and activities</p>
                    </div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-white font-kanit font-bold text-lg flex items-center gap-3">
                                <User className="w-6 h-6" /> YOUR DETAILS
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput label="Full Name" name="fullName" value={attendee.fullName} onChange={(e: any) => handleAttendeeChange("fullName", e.target.value)} placeholder="Your full name" required />
                                <FormInput label="Email" name="email" type="email" value={attendee.email} onChange={(e: any) => handleAttendeeChange("email", e.target.value)} placeholder="your@email.com" required />
                                <FormInput label="Mobile Number" name="phone" value={attendee.phone} onChange={(e: any) => handleAttendeeChange("phone", e.target.value)} placeholder="+91 00000 00000" required />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <FormInput label="Transaction ID (UPI/UTR)" name="transactionId" value={transactionId} onChange={(e: any) => setTransactionId(e.target.value)} placeholder="Your transaction ID" required />
                        </div>

                        <button type="button" onClick={handleSubmit} disabled={isLoading} className="w-full bg-white text-black font-kanit font-black h-16 md:h-20 rounded-2xl md:rounded-3xl text-xl md:text-2xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed uppercase shadow-[0_15px_40px_rgba(255,255,255,0.2)]">
                            {isLoading ? <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" /> : <>REGISTER NOW <Send className="w-6 h-6" /></>}
                        </button>
                    </motion.div>
                </div>
            </div>
            </div>
        </WarpBackground>
    );
}

const FormInput = ({ label, name, value, onChange, type = "text", placeholder, required }: any) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-white/60 font-kanit font-semibold text-[10px] uppercase tracking-wider ml-1">{label}</label>
        <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full bg-black/20 border-2 border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-white/10 focus:border-[#FFEE00] focus:ring-4 focus:ring-[#FFEE00]/5 transition-all outline-none font-poppins text-base focus:bg-black/40" />
    </div>
);

const FormSelect = ({ label, name, value, onChange, options, placeholder, required }: any) => (
    <div className="flex flex-col gap-2 relative">
        <label htmlFor={name} className="text-white/60 font-kanit font-semibold text-[10px] uppercase tracking-wider ml-1">{label}</label>
        <div className="relative">
            <select id={name} name={name} value={value} onChange={onChange} required={required} className="w-full bg-black/40 border-2 border-white/10 rounded-xl h-12 px-4 text-white focus:border-[#FFEE00] focus:ring-4 focus:ring-[#FFEE00]/5 transition-all outline-none font-poppins text-base appearance-none cursor-pointer pr-10">
                <option value="" disabled className="bg-[#1A002E]">{placeholder || "Select"}</option>
                {options.map((opt: string) => <option key={opt} value={opt} className="bg-[#1A002E]">{opt}</option>)}
            </select>
        </div>
    </div>
);

const DayPassRegister = () => (
    <Suspense fallback={<div className="min-h-screen bg-[#13001F] flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#FFEE00] border-t-transparent rounded-full animate-spin" /></div>}>
        <DayPassRegisterContent />
    </Suspense>
);

export default DayPassRegister;
