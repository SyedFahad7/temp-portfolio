"use client";

import { motion } from "framer-motion";

interface GalleryHeaderProps {
  title?: string;
  description?: string;
}

export const GalleryHeader = ({ title, description }: GalleryHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        {title || "Gallery"}
      </h1>
      {description && (
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
          {description}
        </p>
      )}
    </motion.div>
  );
}; 