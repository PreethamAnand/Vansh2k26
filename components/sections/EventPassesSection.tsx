import { Pricing, type PricingPlan } from "@/components/ui/pricing";

const passPlans: PricingPlan[] = [
  {
    name: "STUDENT PASS",
    price: "299",
    period: "pass",
    features: [
      "Full event access for one participant",
      "Workshop + mentor guidance sessions",
      "Participation certificate",
      "Access to open networking zones",
    ],
    description: "Ideal for individual participants joining VANSH 2K26 for the complete core experience.",
    buttonText: "Get Student Pass",
    href: "/register?pass=student",
    isPopular: false,
    badge: "Most Flexible",
    slotsLeft: "Limited seats available",
    footnote: "Best for solo participants and first-time attendees.",
  },
  {
    name: "TEAM PASS",
    price: "999",
    period: "team",
    features: [
      "Covers up to 4 team members",
      "Priority team check-in",
      "Fast-track mentor assistance",
      "Team welcome kit at registration",
    ],
    description: "Best-value plan for teams competing together with faster onboarding support.",
    buttonText: "Get Team Pass",
    href: "/register?pass=team",
    isPopular: true,
    badge: "Best Value",
    slotsLeft: "High demand pass",
    footnote: "Per-team pricing. Add team details during registration.",
  },
  {
    name: "PRO PASS",
    price: "1499",
    period: "pass",
    features: [
      "Everything in Student Pass",
      "Priority keynote seating",
      "VIP networking lounge access",
      "Exclusive merchandise bundle",
    ],
    description: "Premium event experience for participants who want access, comfort, and networking priority.",
    buttonText: "Get Pro Pass",
    href: "/register?pass=pro",
    isPopular: false,
    badge: "Premium",
    slotsLeft: "Very limited seats",
    footnote: "Includes premium on-ground benefits and exclusive add-ons.",
  },
];

export default function EventPassesSection() {
  return (
    <section id="event-passes" aria-label="Event passes" className="relative overflow-hidden py-6 sm:py-10">
      <Pricing
        plans={passPlans}
        title="Event Passes"
        description="Pick the pass that fits your hackathon journey.\nNo hidden fees and confirmation is instant after payment."
        subtitle="Choose your tier and lock your access before registrations close."
      />
    </section>
  );
}