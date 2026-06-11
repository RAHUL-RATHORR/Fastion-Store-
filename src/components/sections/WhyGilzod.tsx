"use client";

import { motion } from "framer-motion";
import { Gem, Crown, Sparkles, Shield } from "lucide-react";
import { whyGilzod } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

const iconMap = {
  gem: Gem,
  crown: Crown,
  sparkles: Sparkles,
  shield: Shield,
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

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
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
                className="group bg-[#f9f9f9] border border-[#e5e5e5] p-5 sm:p-6 text-center hover:shadow-md transition-all duration-500"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 flex items-center justify-center rounded-full border border-[#d4d4d4] group-hover:border-[#111111] transition-colors duration-500">
                  <Icon
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#666666] group-hover:text-[#111111] transition-colors duration-500"
                    strokeWidth={1.2}
                  />
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
