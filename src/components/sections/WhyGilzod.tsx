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
    <section id="about" className="section-padding bg-[#050505] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,192,192,0.03)_0%,transparent_70%)]" />

      <Container className="relative">
        <SectionHeader
          label="Philosophy"
          title="Why Gilzod"
          description="Every piece is a statement of intent — designed for men who demand excellence."
        />

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
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
                className="group glass p-6 sm:p-8 md:p-10 text-center md:hover:silver-glow transition-all duration-500"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-6 flex items-center justify-center rounded-full border border-[rgba(192,192,192,0.15)] group-hover:border-[rgba(192,192,192,0.4)] transition-colors duration-500">
                  <Icon
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#c0c0c0] group-hover:text-[#e5e5e5] transition-colors duration-500"
                    strokeWidth={1.2}
                  />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-white mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
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
