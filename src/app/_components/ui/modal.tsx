"use client";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
}

export default function Modal({ className, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <main
      className={twMerge(
        "fixed inset-0 z-[9999] w-screen h-screen p-4 flex flex-col items-center justify-center gap-4 bg-black/30 overflow-hidden",
        className,
      )}
    >
      {children}
    </main>
  );
}
