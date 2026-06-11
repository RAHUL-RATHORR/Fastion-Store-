"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Ghost, Plus, Minus } from "lucide-react";
import {
  footerSocialIcons,
  footerPaymentPartners,
  footerShippingPartners,
  whoWeAreContent,
} from "@/lib/data";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIconMap = {
  Facebook,
  Instagram,
  Snapchat: Ghost,
  X: XIcon,
} as const;

export function FooterBottomBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-[#e5e5e5] bg-[#f7f7f7]">
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-6">
        {/* Follow Us */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4 mb-5">
          <span className="text-sm text-[#444444] sm:mr-auto">Follow Us:</span>
          <div className="flex items-center gap-2.5">
            {footerSocialIcons.map((social) => {
              const Icon = socialIconMap[social.label as keyof typeof socialIconMap];
              const isSnap = social.label === "Snapchat";
              const isX = social.label === "X";
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                  style={{ backgroundColor: social.color }}
                >
                  <Icon
                    className={`w-4 h-4 ${isSnap ? "text-[#111111]" : "text-white"}`}
                    strokeWidth={isX ? 0 : 2}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Who We Are accordion */}
        <div className="border border-[#dddddd] bg-white mb-5">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 text-left"
            aria-expanded={open}
          >
            <span className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#111111]">
              Who We Are
            </span>
            {open ? (
              <Minus className="w-5 h-5 text-[#111111] shrink-0" strokeWidth={2.5} />
            ) : (
              <Plus className="w-5 h-5 text-[#111111] shrink-0" strokeWidth={2.5} />
            )}
          </button>
          {open && (
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-[#eeeeee]">
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mt-3 mb-4">
                {whoWeAreContent.intro}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {whoWeAreContent.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs sm:text-sm text-[#666666] hover:text-[#111111] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Payment & Shipping */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 pb-4 border-b border-[#e0e0e0]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <span className="text-xs sm:text-sm text-[#444444] whitespace-nowrap shrink-0">
              100% Secure Payment:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {footerPaymentPartners.map((partner) => (
                <span
                  key={partner}
                  className="inline-flex items-center px-2 py-1 bg-white border border-[#e5e5e5] rounded text-[10px] sm:text-[11px] font-medium text-[#333333] whitespace-nowrap"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
          <span className="hidden lg:block text-[#cccccc]">|</span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <span className="text-xs sm:text-sm text-[#444444] whitespace-nowrap shrink-0">
              Shipping Partners:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {footerShippingPartners.map((partner) => (
                <span
                  key={partner}
                  className="inline-flex items-center px-2 py-1 bg-white border border-[#e5e5e5] rounded text-[10px] sm:text-[11px] font-medium text-[#333333] whitespace-nowrap"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-[11px] sm:text-xs text-[#666666] pt-4">
          © GILZOD 2026–27
        </p>
      </div>
    </div>
  );
}
