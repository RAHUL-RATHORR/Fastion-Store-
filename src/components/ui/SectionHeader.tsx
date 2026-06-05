"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-2xl mb-10 sm:mb-14 md:mb-16 lg:mb-20",
        alignment
      )}
    >
      {label && (
        <span className="block text-[10px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#c0c0c0] mb-3 sm:mb-4">
          {label}
        </span>
      )}
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl min-[480px]:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-3 sm:mb-4 px-2 sm:px-0">
        {title}
      </h2>
      {description && (
        <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed max-w-lg mx-auto px-4 sm:px-0">
          {description}
        </p>
      )}
      <div className="mt-6 sm:mt-8 h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#c0c0c0] to-transparent mx-auto" />
    </motion.div>
  );
}
