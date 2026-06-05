"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function BrandStory() {
  return (
    <section id="about" className="section-padding bg-[#050505] relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <Image
          src="/logo.png?v=3"
          alt=""
          fill
          className="object-contain object-right"
        />
      </div>

      <Container className="relative">
        {/* Animated GZ Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
            <Image src="/logo.png?v=3" alt="GZ Monogram" fill unoptimized className="object-contain drop-shadow-[0_0_30px_rgba(192,192,192,0.3)]" />
            <motion.div
              className="absolute inset-0 border border-[rgba(192,192,192,0.2)] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c0c0c0] mb-4 block">
              Our Story
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl min-[480px]:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 leading-tight">
              The Meaning Behind Gilzod
            </h2>
            <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed mb-4">
              Gilzod represents ambition, confidence, strength and timeless style.
            </p>
            <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed">
              Built for those who create their own legacy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden luxury-shadow"
          >
            <Image
              src="/images/editorial/right.jpg"
              alt="Gilzod brand story"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
