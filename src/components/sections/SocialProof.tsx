"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { socialProofStats } from "@/lib/data";
import { Container } from "@/components/ui/Container";

function Counter({
  value,
  suffix,
  decimal,
}: {
  value: number;
  suffix: string;
  decimal?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(decimal ? parseFloat((value * eased).toFixed(1)) : Math.floor(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, decimal]);

  return (
    <span ref={ref} className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl text-white">
      {decimal ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function SocialProof() {
  return (
    <section className="py-12 sm:py-16 bg-[#0d0d0d] border-y border-[rgba(192,192,192,0.06)]">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {socialProofStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} decimal={"decimal" in stat && stat.decimal} />
              <p className="text-[#a1a1aa] text-xs sm:text-sm mt-2 uppercase tracking-[0.15em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
