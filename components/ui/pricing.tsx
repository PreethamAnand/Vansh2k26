"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import NumberFlow from "@number-flow/react";
import Link from "next/link";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features?: string[];
  description?: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  badge?: string;
  slotsLeft?: string;
  footnote?: string;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  subtitle?: string;
}

export function Pricing({
  plans,
  title = "Event Passes",
  description = "Choose your pass and secure your spot for VANSH 2K26.",
  subtitle = "Transparent pricing, instant registration, and on-ground support.",
}: PricingProps) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 right-0 h-72 w-72 rounded-full bg-black/60 blur-3xl" />

      <div className="mb-12 text-center">
        <h2 className="font-kanit text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
          {title}
        </h2>
        {subtitle && (
          <div className="mx-auto mt-4 inline-flex items-center rounded-full border border-amber-300/50 bg-amber-300 px-5 py-2 text-sm font-black uppercase tracking-[0.18em] text-black shadow-[0_0_32px_rgba(252,211,77,0.35)]">
            {subtitle}
          </div>
        )}
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={`${plan.name}-${index}`}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              scale: plan.isPopular ? 1.03 : 1,
            }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.08 }}
            className={cn(
              "relative flex h-full flex-col rounded-2xl border bg-black/35 p-6 text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1",
              plan.isPopular ? "border-cyan-300/70" : "border-white/15",
            )}
          >
            {plan.isPopular && (
              <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl bg-cyan-300 px-2 py-0.5 text-black">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-xs font-semibold uppercase tracking-wide">Popular</span>
              </div>
            )}

            {plan.badge && (
              <div className="mb-2 w-fit rounded-full border border-cyan-300/40 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200">
                {plan.badge}
              </div>
            )}

            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-200/90">{plan.name}</p>

            <div className="mt-5 flex items-end justify-center gap-x-2 md:justify-start">
              <span className="text-5xl font-black tracking-tight text-white">
                <NumberFlow
                  value={Number(plan.price)}
                  format={{
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }}
                  formatter={(value) => `Rs ${value}`}
                  transformTiming={{ duration: 500, easing: "ease-out" }}
                  willChange
                />
              </span>
              <span className="mb-2 text-sm font-medium text-white/70">/ {plan.period}</span>
            </div>

            {plan.slotsLeft && (
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-amber-200/80">{plan.slotsLeft}</p>
            )}

            {plan.features && plan.features.length > 0 && (
              <>
                <ul className="mt-6 flex flex-1 flex-col gap-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={`${plan.name}-${featureIndex}`} className="flex items-start gap-2 text-sm text-white/85">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="my-5 border-white/15" />
              </>
            )}

            <Link
              href={plan.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full text-base font-semibold transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-300 hover:text-black",
                plan.isPopular && "border-cyan-300 bg-cyan-300 text-black hover:bg-cyan-200",
              )}
            >
              {plan.buttonText}
            </Link>

            {plan.description && <p className="mt-5 text-xs leading-5 text-white/65">{plan.description}</p>}
            {plan.footnote && <p className="mt-2 text-[11px] leading-5 text-cyan-200/70">{plan.footnote}</p>}
          </motion.div>
        ))}
      </div>

      <div className="mt-7 rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-center text-xs text-white/65 backdrop-blur-sm sm:text-sm">
        Need invoices or bulk team onboarding support? Contact the event desk via the Contact page before payment.
      </div>
    </div>
  );
}

export type { PricingPlan, PricingProps };
