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
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      <Container className="relative max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#f9f9f9] border border-[#e5e5e5] shadow-sm p-6 sm:p-10 md:p-16 lg:p-20 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#666666] mb-3 sm:mb-4 block">
            Newsletter
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl min-[480px]:text-3xl md:text-4xl lg:text-5xl text-[#111111] mb-3 sm:mb-4">
            Be First To Know
          </h2>
          <p className="text-[#666666] text-sm md:text-base max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
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
              className="flex-1 min-h-[44px] bg-white border border-[#e5e5e5] px-4 sm:px-6 py-3 sm:py-3.5 text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors duration-300 w-full"
            />
            <Button variant="primary" type="submit" className="w-full sm:w-auto whitespace-nowrap bg-[#111111] text-white hover:bg-[#333333]">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </form>

          <p className="text-[#999999] text-[10px] sm:text-xs mt-4 sm:mt-6">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
