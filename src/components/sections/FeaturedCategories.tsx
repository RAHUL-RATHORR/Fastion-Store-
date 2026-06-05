"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

export function FeaturedCategories() {
  return (
    <section id="collection" className="section-padding bg-[#0d0d0d]">
      <Container>
        <SectionHeader
          label="Categories"
          title="Shop By Category"
          description="Explore our curated selection of premium menswear essentials."
        />

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={`#${category.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02 }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#111111] cursor-pointer silver-border transition-all duration-500 md:hover:silver-glow"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 md:group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8">
                <div className="flex items-end justify-between gap-2">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl md:text-3xl text-white">
                    {category.title}
                  </h3>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 glass rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e5e5e5]" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
