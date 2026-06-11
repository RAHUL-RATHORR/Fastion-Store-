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
}: {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link href={href} className="group relative block w-full overflow-hidden bg-white">
      <div className="relative aspect-[3/1] sm:aspect-[24/5] md:aspect-[24/4.5] lg:aspect-[24/4] min-h-[90px] sm:min-h-[110px] md:min-h-[125px] lg:min-h-[140px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-white/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-playfair)] text-lg min-[480px]:text-xl sm:text-2xl md:text-3xl tracking-[0.1em] sm:tracking-[0.14em] text-[#111] mb-0.5 sm:mb-1 drop-shadow-sm"
          >
            {title}
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#333] text-[8px] min-[480px]:text-[9px] sm:text-[10px] tracking-[0.08em] sm:tracking-[0.1em] uppercase max-w-[90%] drop-shadow-sm"
          >
            {subtitle}
          </motion.p>
          <span className="mt-1.5 hidden sm:inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#111]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explore
            <ArrowUpRight className="w-3 h-3" />
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
      className="group relative block overflow-hidden min-h-[110px] sm:min-h-[140px] md:min-h-[155px] lg:min-h-[170px] bg-white"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
      <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 border border-black/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-all duration-300">
        <ArrowUpRight className="w-3.5 h-3.5 text-[#111]" />
      </div>
    </Link>
  );
}

export function EditorialShowcase() {
  const { topBanner, middleRow, bottomBanner } = editorialShowcase;

  return (
    <section className="bg-white w-full overflow-hidden">
      <FullBanner
        image={topBanner.image}
        title={topBanner.title}
        subtitle={topBanner.subtitle}
        href={topBanner.href}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-black/5">
        <SideImage
          image={middleRow.left.image}
          alt={middleRow.left.alt}
          href={middleRow.left.href}
        />

        <Link
          href={middleRow.center.href}
          className="group relative flex flex-col items-center justify-center text-center px-4 sm:px-5 py-4 sm:py-3 md:py-0 min-h-[110px] sm:min-h-[140px] md:min-h-[155px] lg:min-h-[170px] bg-white border-y sm:border-y-0 sm:border-x border-black/5 hover:bg-[#fafafa] transition-colors duration-500"
        >
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-playfair)] text-base min-[480px]:text-lg sm:text-lg md:text-xl text-[#111] mb-1 tracking-wide"
          >
            {middleRow.center.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#555] text-[10px] sm:text-xs leading-snug max-w-[220px]"
          >
            {middleRow.center.subtitle}
          </motion.p>
          <span className="mt-1.5 hidden sm:block text-[9px] uppercase tracking-[0.2em] text-[#111]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      />
    </section>
  );
}
