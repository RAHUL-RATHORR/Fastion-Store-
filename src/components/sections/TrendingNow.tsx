"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/utils";

const trending = products.filter((p) => "badge" in p && p.badge).slice(0, 6);

export function TrendingNow() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-[#111111] mb-8 sm:mb-10"
        >
          Trending Now
        </motion.h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {trending.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="snap-start shrink-0 w-[160px] sm:w-[200px] md:w-[220px]"
            >
              <Link href="#new-arrivals" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#111111] mb-3">
                  <Image src={product.image} alt={product.name} fill sizes="220px" className="object-cover md:group-hover:scale-105 transition-transform duration-500" />
                  {"badge" in product && product.badge ? (
                    <span className="absolute top-2 left-2 text-[8px] uppercase tracking-wider bg-[#e5e5e5] text-[#050505] px-2 py-1">
                      {product.badge}
                    </span>
                  ) : null}
                </div>
                <p className="text-xs sm:text-sm text-[#111111] truncate">{product.name}</p>
                <p className="text-xs text-[#666666] mt-1">{formatPrice(product.price)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
