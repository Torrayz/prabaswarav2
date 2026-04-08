"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  variant?: "glass" | "glass-light" | "solid" | "elevated";
  className?: string;
  hover?: boolean;
}

const variantClasses = {
  glass:
    "bg-white/10 backdrop-blur-lg border border-white/20 shadow-glass",
  "glass-light":
    "bg-white/80 backdrop-blur-lg border border-navy-100/30 shadow-glass-sm",
  solid: "bg-white border border-navy-50 shadow-sm",
  elevated:
    "bg-white border border-navy-50 shadow-lg hover:shadow-xl",
};

export default function Card({
  children,
  variant = "solid",
  className = "",
  hover = true,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
      className={`
        rounded-2xl overflow-hidden transition-shadow duration-300
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
