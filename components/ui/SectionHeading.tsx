"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <div
        className={
          align === "center" ? "accent-line-center" : "accent-line"
        }
      />
      {subtitle && (
        <p
          className={`mt-6 text-lg max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-navy-200" : "text-navy-400"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
