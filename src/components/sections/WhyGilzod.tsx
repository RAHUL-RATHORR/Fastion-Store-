"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Sparkles, Shirt, ShieldCheck } from "lucide-react";
import { whyGilzod } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

const iconMap = {
  gem: BadgeCheck,
  crown: Sparkles,
  comfort: Shirt,
  shield: ShieldCheck,
} as const;

export function WhyGilzod() {
  return (
    <section id="about" className="section-padding-compact bg-white relative">
      <Container className="relative">
        <SectionHeader
          compact
          label="Philosophy"
          title="Why Gilzod"
          description="Every piece is a statement of intent — designed for men who demand excellence."
        />

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {whyGilzod.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group bg-white border border-[#ececec] rounded-sm p-6 sm:p-7 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-[#111111] text-white group-hover:scale-105 transition-transform duration-500">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-[#111111] mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
