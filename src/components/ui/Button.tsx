"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#e5e5e5] text-[#050505] hover:bg-white border border-transparent hover:shadow-[0_0_30px_rgba(229,229,229,0.3)]",
  secondary:
    "bg-transparent text-white border border-[rgba(192,192,192,0.3)] hover:border-[#c0c0c0] hover:bg-[rgba(192,192,192,0.05)]",
  ghost:
    "bg-transparent text-[#c0c0c0] border border-transparent hover:text-white hover:bg-[rgba(255,255,255,0.05)]",
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
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
