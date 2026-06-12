"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#111111] text-white hover:bg-[#333333] border border-transparent hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)]",
  secondary:
    "bg-transparent text-[#111111] border border-[#e5e5e5] hover:border-[#111111] hover:bg-[#fafafa]",
  ghost:
    "bg-transparent text-[#666666] border border-transparent hover:text-[#111111] hover:bg-[#f5f5f5]",
};

const baseStyles =
  "inline-flex items-center justify-center min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 cursor-pointer";

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  href?: string;
} & HTMLMotionProps<"button">;

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: "easeOut" as const },
  };

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
