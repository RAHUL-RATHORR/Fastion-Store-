"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroVideoBackground } from "@/components/ui/HeroVideoBackground";
import { heroVideo } from "@/lib/data";

const line1 = "Rule Beyond".split("");
const line2 = "Limits".split("");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 100, damping: 30 });
  const springY = useSpring(my, { stiffness: 100, damping: 30 });
  const textX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const textY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      id="home"
      onMouseMove={handleMove}
      className="relative min-h-screen-safe flex items-center justify-center overflow-hidden"
    >
      <HeroVideoBackground sources={heroVideo.sources} poster={heroVideo.poster} />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-[#c0c0c0]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-[1]" />

      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 text-center pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-24 md:pt-28 pb-12 sm:pb-16"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block text-[10px] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#e5e5e5] mb-4 sm:mb-6 md:mb-8 drop-shadow-lg"
        >
          Premium Menswear
        </motion.span>

        <h1 className="font-[family-name:var(--font-playfair)] text-[2rem] leading-[1.15] min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[5.5rem] font-normal tracking-tight text-white mb-4 sm:mb-6 md:mb-8 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] px-2">
          <span className="inline-block">
            {line1.map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : undefined }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
          <br />
          <span className="inline-block metallic-text shimmer-text drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            {line2.map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-[#e5e5e5] text-sm sm:text-base lg:text-lg max-w-md mx-auto leading-relaxed mb-8 sm:mb-10 md:mb-12 drop-shadow-md px-4"
        >
          Crafted for ambitious men who refuse ordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto px-4 sm:px-0"
        >
          <Button variant="primary" href="#collection" className="w-full sm:w-auto">
            Shop Collection
          </Button>
          <Button variant="secondary" href="#about" className="w-full sm:w-auto">
            Explore Brand
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
