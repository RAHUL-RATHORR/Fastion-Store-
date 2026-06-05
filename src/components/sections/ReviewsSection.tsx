"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { reviews } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function ReviewsSection() {
  return (
    <section className="section-padding bg-[#050505]">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-white text-center mb-10 sm:mb-14"
        >
          What They Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((review, i) => (
            <motion.blockquote
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 sm:p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#c0c0c0] text-[#c0c0c0]" />
                ))}
              </div>
              <p className="text-[#e5e5e5] text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
              <cite className="text-[#a1a1aa] text-xs not-italic uppercase tracking-[0.15em]">{review.name}</cite>
            </motion.blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
