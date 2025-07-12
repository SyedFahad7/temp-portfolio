"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import GalleryModalAdvanced from "./GalleryModalAdvanced";

interface GalleryImage {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  source: string;
  filename: string;
  copyright: string;
  fieldtype: string;
  meta_data: any;
  is_external_url: boolean;
}

interface GalleryGridProps {
  images: GalleryImage[];
  columns?: number;
  enableModal?: boolean;
  enableDownload?: boolean;
}

export default function GalleryGrid({ 
  images, 
  columns = 3, 
  enableModal = true, 
  enableDownload = true 
}: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Responsive grid columns based on screen size
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          No images available in the gallery
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-4 sm:gap-6 w-full my-8 px-8`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer glass"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={image.filename}
              alt={image.alt || image.title}
              width={400}
              height={300}
              className="relative z-10 w-full h-48 sm:h-56 md:h-64 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                {enableDownload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Download logic can be handled in modal or here
                    }}
                    className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all hover:scale-110"
                  >
                    <Download className="w-4 h-4 text-gray-800" />
                  </button>
                )}
              </div>
            </div>
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-sm font-medium truncate">{image.title}</h3>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {/* Advanced Modal with navigation and thumbnails */}
      {selectedIndex !== null && (
        <GalleryModalAdvanced
          images={images}
          initialIndex={selectedIndex}
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
} 