import Hero from "@/components/sections/hero-section"
import dynamic from "next/dynamic"
import Galaxy from "@/components/Galaxy"

const GuestsSection = dynamic(() => import("@/components/sections/GuestsSection"), {
  ssr: true,
});
const EventsSection = dynamic(() => import("@/components/sections/EventsSection"), {
  ssr: true,
});
const MomentsMarquee = dynamic(() => import("@/components/sections/MomentsMarquee"), {
  ssr: true,
});
const EventPassesSection = dynamic(() => import("@/components/sections/EventPassesSection"), {
  ssr: true,
});

export default function Home() {
  return (
    <main className="relative z-0">
      {/* Global Fixed Background to solve "divided" seams and reduce WebGL contexts */}
      <div className="fixed inset-0 z-[-1] h-screen w-screen bg-black">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.2}
          saturation={0.5}
          hueShift={200}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.7}
          speed={1.9}
        />
      </div>
      <Hero />
      <GuestsSection />
      <EventsSection />
      <MomentsMarquee />
      <EventPassesSection />
    </main>
  );
}
