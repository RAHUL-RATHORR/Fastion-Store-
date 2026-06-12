"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { sizeGuide } from "@/lib/data";

export function SizeGuideModal() {
  const { sizeGuideOpen, closeSizeGuide } = useUI();

  return (
    <AnimatePresence>
      {sizeGuideOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[85]"
            onClick={closeSizeGuide}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[86] w-[calc(100%-2rem)] max-w-lg glass luxury-shadow p-6 sm:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#111111]">Size Guide</h3>
              <button onClick={closeSizeGuide} aria-label="Close" className="text-[#666666] hover:text-[#111111]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#888888] text-left border-b border-[#e5e5e5]">
                    <th className="pb-3 pr-4">Size</th>
                    <th className="pb-3 pr-4">Chest</th>
                    <th className="pb-3 pr-4">Waist</th>
                    <th className="pb-3">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeGuide.map((row) => (
                    <tr key={row.size} className="border-b border-[#f0f0f0] text-[#111111]">
                      <td className="py-3 pr-4 font-medium">{row.size}</td>
                      <td className="py-3 pr-4 text-[#666666]">{row.chest}&quot;</td>
                      <td className="py-3 pr-4 text-[#666666]">{row.waist}&quot;</td>
                      <td className="py-3 text-[#666666]">{row.length}&quot;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#888888] text-xs mt-4">All measurements in inches. For help, contact support.</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
