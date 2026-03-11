"use client";
import Image from "next/image";
import FadeInView from "@/components/FadeInView";
import { Trophy } from "lucide-react";

const PrizePool = () => {
    return (
        <div className="w-full relative min-h-[500px] overflow-hidden flex flex-col items-center pt-6 pb-12 border-t-2 border-white/5">
            {/* Main Section Background - High Fidelity Banner */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/banner-bg.png"
                    alt="Prize Pool Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#13001F]/80 via-transparent to-[#13001F]/90" />
            </div>

            {/* Decorative Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#62009B] opacity-20 blur-[150px] rounded-full pointer-events-none z-10" />

            {/* Header */}
            <FadeInView delay={0.1} className="relative z-20 mb-2 flex flex-row items-center justify-center gap-4">
                <div className="relative flex items-center justify-center w-10 h-10 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(255,238,0,0.5)] rotate-[-10deg] text-[#FFEE00]">
                    <Trophy size={48} className="w-full h-full" strokeWidth={2.5} />
                </div>
                <h2 className="text-white text-4xl md:text-6xl font-extrabold font-kanit tracking-tighter drop-shadow-xl uppercase">
                    Prize Pool
                </h2>
            </FadeInView>

            {/* Prize Amount Display - Clean Vector Style */}
            <FadeInView delay={0.2} className="relative z-20 mb-4 flex flex-col items-center">
                <p className="text-[#FFEE00]/60 font-kanit font-bold uppercase tracking-[0.3em] text-sm mb-1 italic">Upto</p>
                <h3 className="relative text-[#FFEE00] text-6xl md:text-8xl font-black font-kanit tracking-tighter leading-none shrink-0">
                    ₹<span className="ml-2">50,000</span>
                </h3>
            </FadeInView>


            <div className="w-full max-w-[800px] px-4 md:px-6 relative z-30 mt-4 flex flex-col items-center">
                {/* Bonus Note */}
                <FadeInView delay={0.4} className="mt-8 flex justify-center w-full">
                    <div className="bg-[#FFEE00] text-[#62009B] px-12 py-4 rounded-2xl font-extrabold text-lg md:text-xl tracking-widest uppercase shadow-[0_10px_0_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-[0_5px_0_rgba(0,0,0,0.2)] transition-all cursor-default text-center w-fit">
                        And Many More Exciting Rewards! 🚀
                    </div>
                </FadeInView>
            </div>
        </div>
    );
};

export default PrizePool;
