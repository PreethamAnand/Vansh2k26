"use client";
import Image from "next/image";
import FadeInView from "@/components/FadeInView";

const Domains = () => {
    const DOMAIN_DATA = [
        {
            id: 1,
            title: "Technical Expo",
            icon: "/sticker-ai.png",
            color: "#00C8FF",
            description: "Hackathons, Paper Presentations, and Robo-Wars."
        },
        {
            id: 2,
            title: "Cultural Fusion",
            icon: "/sticker-cyber.png",
            color: "#FF00C8",
            description: "Music, Dance, Fashion Show, and Talent Hunts."
        },
        {
            id: 3,
            title: "Sports & Literary",
            icon: "/sticker-cloud.png",
            color: "#FFEE00",
            description: "Athletics, Quizzes, Debates, and e-Sports."
        }
    ];

    return (
        <div className="w-full relative bg-[#13001F] overflow-hidden flex flex-col items-center pt-8 pb-16">
            {/* Decorative Light Glows - Premium background */}
            <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[#62009B] opacity-20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#A200FF] opacity-15 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Lightning Effects - Repositioned for mobile */}
            <FadeInView className="hidden sm:block absolute top-[-100px] left-[-30px] w-[350px] aspect-square z-0 opacity-40 pointer-events-none">
                <Image src="/MailingList/lightning_left.svg" alt="" fill className="object-contain" />
            </FadeInView>
            <FadeInView className="hidden sm:block absolute top-[-80px] right-[-20px] w-[400px] aspect-square z-0 opacity-40 pointer-events-none">
                <Image src="/MailingList/lightning_right.svg" alt="" fill className="object-contain" />
            </FadeInView>

            {/* Header - Compact and High Impact */}
            <FadeInView delay={0.2} className="relative z-20 mb-10 flex flex-col items-center">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <span className="hidden sm:inline-block text-4xl sm:text-5xl mb-2 sm:mb-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">🎭</span>
                    <h2 className="text-white text-5xl md:text-7xl font-extrabold font-kanit tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                        CATEGORIES
                    </h2>
                </div>
                <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-[#FFEE00] to-transparent mt-3 rounded-full" />
            </FadeInView>

            <div className="w-full max-w-[1100px] px-4 md:px-6 relative z-30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {DOMAIN_DATA.map((domain, i) => (
                        <FadeInView key={domain.id} delay={0.1 * i}>
                            <div className="group relative h-full">
                                {/* Premium Card Theme - White border like newsletter but more futuristic */}
                                <div className="relative h-full overflow-hidden bg-[linear-gradient(135deg,_rgba(98,0,155,0.8)_0%,_rgba(43,8,69,0.95)_100%)] border-[3px] border-white/90 rounded-[30px] p-6 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:border-[#FFEE00]">

                                    {/* Glowing background hint */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity" style={{ backgroundColor: domain.color }} />

                                    <div className="flex flex-col items-center relative z-10 h-full">
                                        {/* Icon - Floating style */}
                                        <div className="relative w-24 h-24 mb-6 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                                            <Image
                                                src={domain.icon}
                                                alt={domain.title}
                                                fill
                                                className="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
                                            />
                                        </div>

                                        {/* Track Number */}
                                        <div className="absolute top-0 left-0 bg-white text-[#62009B] font-extrabold px-4 py-1 rounded-br-2xl text-sm font-kanit">
                                            CATEGORY 0{domain.id}
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-white text-2xl font-bold font-kanit mb-3 text-center leading-tight group-hover:text-[#FFEE00] transition-colors">
                                            {domain.title}
                                        </h3>
                                        <p className="text-white/70 text-center font-poppins text-sm leading-relaxed mb-4">
                                            {domain.description}
                                        </p>

                                        {/* Choose Label - Newsletter style pill */}
                                        <div className="mt-auto pt-4 w-full">
                                            <div className="bg-white/10 group-hover:bg-[#FFEE00] border-2 border-white/20 group-hover:border-white transition-all rounded-2xl py-2 px-4 flex items-center justify-center gap-2">
                                                <span className="text-white group-hover:text-[#62009B] font-bold font-kanit text-sm uppercase tracking-wider">
                                                    See Events
                                                </span>
                                                <div className="w-2 h-2 rounded-full bg-white group-hover:bg-[#62009B] animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Outer shadow glow */}
                                <div className="absolute inset-0 -z-10 rounded-[30px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl" style={{ backgroundColor: domain.color }} />
                            </div>
                        </FadeInView>
                    ))}
                </div>

                {/* Mandatory Footer Note */}
                <FadeInView delay={0.5} className="mt-10 flex justify-center">
                    <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
                        <p className="text-[#FFEE00] font-bold text-center italic text-xs md:text-sm tracking-wide">
                            * Participation in multiple categories is allowed. Prizes are category-specific.
                        </p>
                    </div>
                </FadeInView>
            </div>
        </div>
    );
};

export default Domains;
