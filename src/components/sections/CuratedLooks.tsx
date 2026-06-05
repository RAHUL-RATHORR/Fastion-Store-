"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { curatedLooks } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

function getOffset(index: number, active: number, total: number) {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function useSlideSpacing() {
  const [spacing, setSpacing] = useState(165);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSpacing(130);
      else if (window.innerWidth < 1024) setSpacing(165);
      else setSpacing(195);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return spacing;
}

function LookCard({
  look,
  isCenter,
}: {
  look: (typeof curatedLooks)[number];
  isCenter: boolean;
}) {
  return (
    <Link
      href={look.href}
      className={cn(
        "group relative block aspect-[3/4] overflow-hidden bg-[#111111] silver-border transition-shadow duration-500 w-full",
        isCenter && "luxury-shadow"
      )}
    >
      <Image
        src={look.image}
        alt={look.title}
        fill
        sizes="(max-width: 640px) 42vw, 280px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority={isCenter}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-[#050505]/10 to-transparent" />

      {isCenter && (
        <div className="absolute top-4 left-4 right-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#e5e5e5] drop-shadow-lg">
            {look.title}
          </span>
        </div>
      )}

      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
        <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#e5e5e5] text-[#050505] text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.12em] px-3 py-2 sm:px-4 sm:py-2.5 rounded-full hover:bg-white transition-colors duration-300">
          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
          Shop All
        </span>
      </div>
    </Link>
  );
}

export function CuratedLooks() {
  const [active, setActive] = useState(2);
  const spacing = useSlideSpacing();
  const total = curatedLooks.length;
  const dragRef = useRef(0);

  const next = useCallback(() => setActive((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x - dragRef.current < -50) next();
    else if (info.offset.x - dragRef.current > 50) prev();
    dragRef.current = 0;
  };

  return (
    <section className="section-padding bg-[#050505] overflow-hidden">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-[family-name:var(--font-playfair)] text-2xl min-[480px]:text-3xl sm:text-4xl md:text-[2.5rem] text-white text-center mb-10 sm:mb-12 md:mb-16 tracking-tight"
        >
          Curated Looks For You
        </motion.h2>

        <div className="relative px-10 sm:px-14 md:px-16">
          <button
            onClick={prev}
            aria-label="Previous look"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#e5e5e5] text-[#050505] flex items-center justify-center hover:bg-white transition-colors duration-300 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Next look"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#e5e5e5] text-[#050505] flex items-center justify-center hover:bg-white transition-colors duration-300 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className="relative h-[300px] sm:h-[360px] md:h-[400px] lg:h-[440px] overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {curatedLooks.map((look, index) => {
                const offset = getOffset(index, active, total);
                if (Math.abs(offset) > 2) return null;
                const scale = offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.82 : 0.68;
                const opacity = Math.abs(offset) === 2 ? 0.5 : 1;

                return (
                  <motion.div
                    key={look.id}
                    className="absolute w-[38vw] max-w-[160px] sm:w-[200px] sm:max-w-[200px] md:w-[240px] md:max-w-[240px] lg:w-[280px] lg:max-w-[280px]"
                    animate={{ x: offset * spacing, scale, opacity }}
                    transition={{ type: "spring", stiffness: 260, damping: 32 }}
                    style={{ zIndex: 10 - Math.abs(offset) }}
                  >
                    <LookCard look={look} isCenter={offset === 0} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {curatedLooks.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === active ? "w-8 bg-[#e5e5e5]" : "w-4 bg-[#a1a1aa]/40 hover:bg-[#a1a1aa]"
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
