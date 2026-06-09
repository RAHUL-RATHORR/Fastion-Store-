"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed right-4 sm:right-6 bottom-24 md:bottom-8 z-50 w-11 h-11 sm:w-12 sm:h-12 glass-strong border border-[rgba(192,192,192,0.15)] rounded-full flex items-center justify-center text-[#e5e5e5] hover:text-white hover:silver-glow transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
