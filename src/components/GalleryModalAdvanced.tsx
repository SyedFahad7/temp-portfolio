/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import downloadPhoto from "../utils/downloadPhoto";

function SkeletonLoader({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-700 w-full h-full rounded-lg flex items-center justify-center ${className}`}>
      <img src="/gifs/loading.gif" alt="Loading..." className="w-24 h-24 opacity-80" />
    </div>
  );
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

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

const ChevronLeftIcon = () => (
  <svg className="md:h-8 md:w-8 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>Previous</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="md:h-8 md:w-8 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>Next</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const XMarkIcon = () => (
  <svg className="md:h-8 md:w-8 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>Close</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowDownTrayIcon = () => (
  <svg className="md:h-8 md:w-8 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>Download</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const ArrowTopRightOnSquareIcon = () => (
  <svg className="md:h-8 md:w-8 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>Open fullsize</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

export default function GalleryModalAdvanced({
  images,
  initialIndex,
  isOpen,
  onClose,
}: {
  images: GalleryImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [curIndex, setCurIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      const navbar = document.querySelector("header");
      if (navbar) (navbar as HTMLElement).style.display = "none";
    } else {
      document.body.classList.remove("modal-open");
      const navbar = document.querySelector("header");
      if (navbar) (navbar as HTMLElement).style.display = "";
    }
    return () => {
      document.body.classList.remove("modal-open");
      const navbar = document.querySelector("header");
      if (navbar) (navbar as HTMLElement).style.display = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setCurIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && curIndex < images.length - 1) {
        setDirection(1);
        setCurIndex((i) => i + 1);
      }
      if (e.key === "ArrowLeft" && curIndex > 0) {
        setDirection(-1);
        setCurIndex((i) => i - 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [curIndex, images.length, isOpen, onClose]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (curIndex < images.length - 1) {
        setDirection(1);
        setCurIndex(curIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (curIndex > 0) {
        setDirection(-1);
        setCurIndex(curIndex - 1);
      }
    },
    trackMouse: true,
  });

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const currentImage = images[curIndex];
  const min = Math.max(0, curIndex - 15);
  const max = Math.min(images.length - 1, curIndex + 15);
  const filteredImages = images.slice(min, max + 1);
  const barWidth = filteredImages.length * 120;
  const activeOffset = (curIndex - min) * 120;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleBackdropClick}
      />
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="relative z-50 flex w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl items-center justify-center"
          style={{ maxHeight: "90vh" }}
          {...handlers}
        >
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative flex items-center justify-center w-full h-full">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={curIndex}
                  custom={direction}
                  initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
                  className="absolute"
                >
                  {!loaded && (
                    <SkeletonLoader className="absolute inset-0 w-full h-full z-0" />
                  )}
                  <Image
                    src={currentImage.filename}
                    width={1280}
                    height={853}
                    priority
                    alt={currentImage.alt || currentImage.title || "Gallery image"}
                    onLoad={() => setLoaded(true)}
                    className={`rounded-lg object-contain max-h-[80vh] max-w-full ${!loaded ? 'opacity-0' : 'opacity-100'}`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
            {loaded && (
              <div className="relative aspect-[3/2] max-h-full w-full">
                {curIndex > 0 && (
                  <button
                    className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => {
                      setDirection(-1);
                      setCurIndex(curIndex - 1);
                    }}
                  >
                    <ChevronLeftIcon />
                  </button>
                )}
                {curIndex + 1 < images.length && (
                  <button
                    className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => {
                      setDirection(1);
                      setCurIndex(curIndex + 1);
                    }}
                  >
                    <ChevronRightIcon />
                  </button>
                )}
              </div>
            )}
            <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-b from-black/0 to-black/60">
              <div className="relative w-full overflow-x-hidden">
                <motion.div
                  initial={false}
                  animate={{
                    x: `calc(50vw - ${activeOffset + 60}px)`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="mx-auto mt-6 mb-6 flex h-14 min-w-fit relative"
                  style={{ width: barWidth }}
                >
                  <AnimatePresence initial={false}>
                    {filteredImages.map((img, idx) => {
                      const realIdx = min + idx;
                      return (
                        <motion.button
                          initial={{ width: 0, opacity: 0 }}
                          animate={{
                            scale: realIdx === curIndex ? 1.25 : 1,
                            zIndex: realIdx === curIndex ? 20 : 10,
                            width: 120,
                            opacity: 1,
                          }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          onClick={() => {
                            setDirection(realIdx > curIndex ? 1 : -1);
                            setCurIndex(realIdx);
                          }}
                          key={img.id}
                          className={`relative inline-block h-full shrink-0 transform-gpu overflow-hidden focus:outline-none transition-all duration-200 ${
                            realIdx === curIndex
                              ? "z-20 rounded-md shadow shadow-black/50"
                              : "z-10"
                          } ${realIdx === min ? "rounded-l-md" : ""} ${realIdx === max ? "rounded-r-md" : ""}`}
                          style={{ marginLeft: idx === 0 ? 0 : 4, marginRight: idx === filteredImages.length - 1 ? 0 : 4 }}
                        >
                          <Image
                            alt="small photos on the bottom"
                            width={120}
                            height={80}
                            className={`object-contain h-full w-full transition-all duration-200 ${
                              realIdx === curIndex
                                ? "brightness-110 hover:brightness-110"
                                : "brightness-50 contrast-125 hover:brightness-75"
                            }`}
                            src={img.filename}
                          />
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </MotionConfig>
    </div>
  );
} 