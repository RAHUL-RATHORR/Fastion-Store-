"use client";

import { motion } from "framer-motion";
import { pressLogos } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function PressStrip() {
  return (
    <section className="py-10 sm:py-14 bg-[#0d0d0d] border-y border-[rgba(192,192,192,0.06)] overflow-hidden">
      <Container>
        <p className="text-center text-[10px] uppercase tracking-[0.35em] text-[#a1a1aa] mb-8">As Seen In</p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
          {pressLogos.map((logo, i) => (
            <motion.span
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl md:text-2xl text-[#a1a1aa]/60 hover:text-[#c0c0c0] transition-colors tracking-[0.2em] cursor-default"
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </Container>
    </section>
  );
}
