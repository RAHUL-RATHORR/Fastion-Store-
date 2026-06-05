"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dropEndDate } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

function getTimeLeft() {
  const diff = dropEndDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

export function ShopTheDrop() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const blocks = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.mins },
    { label: "Secs", value: time.secs },
  ];

  return (
    <section className="section-padding bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,192,192,0.04)_0%,transparent_70%)]" />
      <Container className="relative text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.35em] text-[#c0c0c0] block mb-4"
        >
          Limited Drop
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl text-white mb-8 sm:mb-10"
        >
          Shop The Drop
        </motion.h2>
        <div className="flex justify-center gap-3 sm:gap-6 mb-10">
          {mounted &&
            blocks.map((b) => (
            <div key={b.label} className="glass px-4 sm:px-6 py-3 sm:py-4 min-w-[64px] sm:min-w-[80px]">
              <span className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-white block">
                {String(b.value).padStart(2, "0")}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#a1a1aa]">{b.label}</span>
            </div>
            ))}
        </div>
        <Button variant="primary" href="#new-arrivals">Shop Before It&apos;s Gone</Button>
      </Container>
    </section>
  );
}
