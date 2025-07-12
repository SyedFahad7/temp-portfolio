"use client";
import { useEffect } from "react";

export default function BodyClassEffect({ className }: { className: string }) {
  useEffect(() => {
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
  return null;
} 