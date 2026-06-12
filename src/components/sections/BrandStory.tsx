"use client";

import { motion } from "framer-motion";
import { brandStory } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function BrandStory() {
  return (
    <section id="about" className="pt-10 sm:pt-12 md:pt-14 pb-6 sm:pb-8 bg-white border-y border-[#eeeeee] relative overflow-hidden">
      <Container className="relative max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#888888] mb-5 sm:mb-6">
            {brandStory.eyebrow}
          </span>

          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-[#111111] leading-tight mb-4 sm:mb-5">
            {brandStory.title}
          </h2>

          <p className="text-[#444444] text-base sm:text-lg md:text-xl leading-relaxed font-medium mb-8 sm:mb-10">
            {brandStory.intro}
          </p>

          <div className="w-12 h-px bg-[#111111] mx-auto mb-8 sm:mb-10" />

          <div className="space-y-5 sm:space-y-6 text-left sm:text-center max-w-2xl mx-auto">
            {brandStory.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-[#555555] text-sm sm:text-base leading-[1.75] sm:leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 sm:mt-10 pt-6 sm:pt-7 pb-4 sm:pb-5 border-t border-[#eeeeee]"
          >
            <p className="font-[family-name:var(--font-playfair)] text-[1.5rem] min-[375px]:text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-[0.1em] sm:tracking-[0.14em] text-[#111111] leading-tight w-full max-w-5xl mx-auto px-2">
              {brandStory.tagline}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
