"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
  title?: string;
}

export default function Modal({
  className,
  children,
  onClose,
  title = "Dialog",
}: ModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <dialog
      aria-modal="true"
      aria-label={title}
      className={twMerge(
        "fixed inset-0 z-[9999] w-screen h-screen p-4 flex flex-col items-center justify-center bg-black/40",
        className,
      )}
    >
      <div className="relative w-full flex justify-center">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute -top-12 right-0 md:right-auto md:top-4 md:-right-12 btn-ghost p-2 text-white md:text-slate-600 dark:md:text-slate-300"
          >
            <X size={20} />
          </button>
        )}
        {children}
      </div>
    </dialog>
  );
}
