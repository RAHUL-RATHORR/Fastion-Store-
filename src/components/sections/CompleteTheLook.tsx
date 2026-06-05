"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/utils";

interface CompleteTheLookProps {
  productId: number;
}

export function CompleteTheLook({ productId }: CompleteTheLookProps) {
  const product = products.find((p) => p.id === productId);
  const pair = product && "pairWith" in product ? products.find((p) => p.id === product.pairWith) : null;

  if (!pair) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 sm:mt-16 glass p-6 sm:p-8"
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#c0c0c0] mb-4">Complete The Look</p>
      <Link href="#new-arrivals" className="flex items-center gap-4 sm:gap-6 group">
        <div className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 overflow-hidden bg-[#111111]">
          <Image src={pair.image} alt={pair.name} fill sizes="96px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base text-white group-hover:text-[#e5e5e5] transition-colors">Pair with {pair.name}</p>
          <p className="text-[#c0c0c0] text-sm mt-1">{formatPrice(pair.price)}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-[#c0c0c0] group-hover:text-white shrink-0 transition-colors" />
      </Link>
    </motion.div>
  );
}

export function CompleteTheLookFeatured() {
  return (
    <Container>
      <CompleteTheLook productId={1} />
    </Container>
  );
}
