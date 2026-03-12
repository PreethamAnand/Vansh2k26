import { Pricing, type PricingPlan } from "@/components/ui/pricing";
import Galaxy from "@/components/Galaxy";

const passPlans: PricingPlan[] = [
  {
    name: "DAY PASS",
    price: "299",
    period: "pass",
    features: ["Full day access to main events and activities", "Best for individual attendees"],
    description: "Early bird pricing is live now.",
    badge: "Early Bird",
    footnote: "After Early Bird: Rs 349/-",
    buttonText: "Get Day Pass",
    href: "/register/day-pass",
    isPopular: false,
  },
  {
    name: "GROUP PASS",
    price: "1499",
    period: "group",
    features: ["Ideal for groups of 5 and above", "Best value for squads attending together"],
    description: "Discounted early bird rate for group registrations.",
    badge: "Early Bird",
    footnote: "After Early Bird: Rs 1749/-",
    buttonText: "Get Team Pass",
    href: "/register/group-pass",
    isPopular: true,
  },
  {
    name: "VIP PASS",
    price: "599",
    period: "pass",
    features: ["Premium access tier", "Priority experience for VIP attendees"],
    description: "Early bird pricing is live now.",
    badge: "Early Bird",
    footnote: "After Early Bird: Rs 649/-",
    buttonText: "Get VIP Pass",
    href: "/register/vip-pass",
    isPopular: false,
  },
];

export default function EventPassesSection() {
  return (
    <section id="event-passes" aria-label="Event passes" className="relative overflow-hidden bg-black py-6 sm:py-10">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={false}
          density={1.7}
          glowIntensity={0.2}
          saturation={0.5}
          hueShift={260}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.7}
          speed={1.9}
        />
      </div>
      <div className="relative z-10">
        <Pricing
          plans={passPlans}
          title="Event Passes"
          description="Pick the pass that fits your VANSH 2K26 experience. No hidden fees and confirmation is instant after payment."
          subtitle="Early Bird Offers Live Now"
        />
      </div>
    </section>
  );
}
