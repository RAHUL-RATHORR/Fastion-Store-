"use client";

import { motion } from "framer-motion";
import { marqueeItems } from "@/lib/data";

export function MarqueeStrip() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="bg-[#0d0d0d] border-y border-[rgba(192,192,192,0.08)] overflow-hidden py-3">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#c0c0c0] mx-6 sm:mx-10"
          >
            {item}
            <span className="ml-6 sm:ml-10 text-[#a1a1aa]/40">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
