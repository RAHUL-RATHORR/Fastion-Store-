"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section id="contact" className="section-padding bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(192,192,192,0.05)_0%,transparent_50%)]" />

      <Container className="relative max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass luxury-shadow p-6 sm:p-10 md:p-16 lg:p-20 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#c0c0c0] mb-3 sm:mb-4 block">
            Newsletter
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl min-[480px]:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4">
            Be First To Know
          </h2>
          <p className="text-[#a1a1aa] text-sm md:text-base max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Get exclusive access to new collections and limited drops.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto w-full"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 min-h-[44px] bg-[#111111] border border-[rgba(192,192,192,0.12)] px-4 sm:px-6 py-3 sm:py-3.5 text-sm text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#c0c0c0] transition-colors duration-300 w-full"
            />
            <Button variant="primary" type="submit" className="w-full sm:w-auto whitespace-nowrap">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </form>

          <p className="text-[#a1a1aa]/60 text-[10px] sm:text-xs mt-4 sm:mt-6">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
