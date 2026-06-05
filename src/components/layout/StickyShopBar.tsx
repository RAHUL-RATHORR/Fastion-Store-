"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function StickyShopBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-auto z-40"
        >
          <div className="glass-strong luxury-shadow flex items-center justify-between gap-4 px-4 py-3 md:px-6 rounded-none md:rounded-sm">
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c0c0c0]">New Drop Live</p>
              <p className="text-sm text-white font-light">Shop the collection</p>
            </div>
            <Button variant="primary" href="#new-arrivals" className="flex-1 sm:flex-none py-2.5 px-6 text-[10px]">
              Shop Now
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
