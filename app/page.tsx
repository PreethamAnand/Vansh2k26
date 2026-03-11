import Hero from "@/components/sections/hero-section"
import GuestsSection from "@/components/sections/GuestsSection"
import EventsSection from "@/components/sections/EventsSection"
import MomentsMarquee from "@/components/sections/MomentsMarquee"

export default function Home() {
  return (
    <main>
      <Hero />
      <GuestsSection />
      <EventsSection />
      <MomentsMarquee />
    </main>
  );
}
