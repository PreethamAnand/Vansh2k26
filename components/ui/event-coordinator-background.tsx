"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ElegantShape } from "./shape-landing-hero";
import { cn } from "@/lib/utils";

export function EventCoordinatorBackground() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            {/* Animated shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            {/* VANSH Logo - Centered and Prominent */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    duration: 1.2,
                    delay: 0.3,
                    ease: [0.23, 0.86, 0.39, 0.96],
                }}
                className="absolute inset-0 flex items-center justify-center z-10"
            >
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                    className="text-center"
                >
                    <Image
                        src="/vansh_logo.PNG"
                        alt="VANSH 2K26"
                        width={180}
                        height={180}
                        className="h-40 w-auto object-contain drop-shadow-2xl"
                        priority
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            delay: 1.2,
                        }}
                        className="mt-6"
                    >
                        <h2 className="text-2xl md:text-4xl font-black tracking-wider text-white mb-2">
                            Event Coordinator
                        </h2>
                        <p className="text-white/60 text-sm md:text-base tracking-wide">
                            Manage VANSH 2K26 Events
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}
