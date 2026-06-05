"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { editorialShowcase } from "@/lib/data";

function FullBanner({
  image,
  title,
  subtitle,
  href,
  dark = false,
}: {
  image: string;
  title: string;
  subtitle: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <Link href={href} className="group relative block w-full overflow-hidden">
      <div className="relative aspect-[4/3] min-[480px]:aspect-[16/9] sm:aspect-[21/9] md:aspect-[21/8] lg:aspect-[21/7] min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[340px] xl:min-h-[380px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 ${
            dark
              ? "bg-[#050505]/55"
              : "bg-gradient-to-t from-[#050505]/60 via-[#050505]/20 to-[#050505]/30"
          }`}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-playfair)] text-2xl min-[480px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.2em] text-white mb-2 sm:mb-3 md:mb-4"
          >
            {title}
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#e5e5e5] text-[10px] min-[480px]:text-xs sm:text-sm md:text-base tracking-[0.1em] sm:tracking-[0.15em] uppercase max-w-[90%]"
          >
            {subtitle}
          </motion.p>
          <span className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#c0c0c0] opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity duration-300">
            Explore
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SideImage({
  image,
  alt,
  href,
}: {
  image: string;
  alt: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden min-h-[240px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px] xl:min-h-[480px]"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/20 transition-colors duration-500" />
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-10 h-10 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 max-md:translate-y-0">
        <ArrowUpRight className="w-4 h-4 text-[#e5e5e5]" />
      </div>
    </Link>
  );
}

export function EditorialShowcase() {
  const { topBanner, middleRow, bottomBanner } = editorialShowcase;

  return (
    <section className="bg-[#050505] w-full overflow-hidden">
      <FullBanner
        image={topBanner.image}
        title={topBanner.title}
        subtitle={topBanner.subtitle}
        href={topBanner.href}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3">
        <SideImage
          image={middleRow.left.image}
          alt={middleRow.left.alt}
          href={middleRow.left.href}
        />

        <Link
          href={middleRow.center.href}
          className="group relative flex flex-col items-center justify-center text-center px-6 sm:px-8 py-12 sm:py-10 md:py-0 min-h-[220px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px] xl:min-h-[480px] bg-[#0d0d0d] border-y sm:border-y-0 sm:border-x border-[rgba(192,192,192,0.08)] hover:bg-[#111111] transition-colors duration-500"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-playfair)] text-xl min-[480px]:text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-3 sm:mb-4 tracking-wide"
          >
            {middleRow.center.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#a1a1aa] text-sm md:text-base leading-relaxed max-w-xs group-hover:text-[#c0c0c0] transition-colors duration-300"
          >
            {middleRow.center.subtitle}
          </motion.p>
          <span className="mt-6 sm:mt-8 text-[10px] uppercase tracking-[0.25em] text-[#c0c0c0] opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity duration-300">
            Shop Now
          </span>
        </Link>

        <SideImage
          image={middleRow.right.image}
          alt={middleRow.right.alt}
          href={middleRow.right.href}
        />
      </div>

      <FullBanner
        image={bottomBanner.image}
        title={bottomBanner.title}
        subtitle={bottomBanner.subtitle}
        href={bottomBanner.href}
        dark
      />
    </section>
  );
}
