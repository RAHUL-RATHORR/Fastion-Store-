"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { storeLocations } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function StoreLocator() {
  return (
    <section className="section-padding bg-[#050505]">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-white text-center mb-10 sm:mb-14"
        >
          Our Stores
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {storeLocations.map((store, i) => (
            <motion.div
              key={store.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 sm:p-8 text-center hover:silver-glow transition-all duration-500"
            >
              <MapPin className="w-5 h-5 text-[#c0c0c0] mx-auto mb-4" strokeWidth={1.2} />
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-2">{store.city}</h3>
              <p className="text-[#a1a1aa] text-sm mb-3">{store.address}</p>
              <span className={`text-[10px] uppercase tracking-[0.2em] ${store.status === "Open" ? "text-[#c0c0c0]" : "text-[#a1a1aa]"}`}>
                {store.status}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
