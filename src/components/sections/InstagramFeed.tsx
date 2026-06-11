"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { instagramPosts } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

const INSTAGRAM_URL = "https://www.instagram.com/gilzod_official/";

export function InstagramFeed() {
  return (
    <section className="section-padding-compact bg-white">
      <Container>
        <SectionHeader
          compact
          title="Join The Movement"
          description="Follow our journey and be part of the Gilzod community."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 md:gap-3">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-square overflow-hidden bg-[#111111]"
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 md:group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#050505]/0 md:group-hover:bg-[#050505]/60 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center gap-1 sm:gap-2">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
                  <span className="text-[10px] sm:text-xs text-[#e5e5e5] tracking-wider">
                    {post.likes}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-5 sm:mt-6"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#666666] hover:text-[#111111] transition-colors duration-300 min-h-[44px]"
          >
            <Instagram className="w-4 h-4" strokeWidth={1.5} />
            Follow @gilzod_official
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
