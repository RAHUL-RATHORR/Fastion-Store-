"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { lookbookItems, products } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/utils";

export function LookbookStrip() {
  return (
    <section className="section-padding bg-[#0d0d0d] overflow-hidden">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-white text-center mb-8 sm:mb-12"
        >
          As Worn By
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {lookbookItems.map((item, i) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#111111] mb-4">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover md:group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white text-sm uppercase tracking-[0.2em]">{item.title}</span>
                </div>
                {product && (
                  <Link href="#new-arrivals" className="flex items-center justify-between glass p-3 hover:silver-glow transition-all">
                    <span className="text-sm text-white">{product.name}</span>
                    <span className="text-xs text-[#c0c0c0]">{formatPrice(product.price)}</span>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
