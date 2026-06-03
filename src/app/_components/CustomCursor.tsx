"use client";
import { useEffect, useState } from "react";
import { LazyMotion, m, domAnimation, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, visible: false });
  const [isHovering, setIsHovering] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    finePointer.addEventListener("change", onChange);
    return () => finePointer.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY, visible: true });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          !!target.closest("button") ||
          !!target.closest("a") ||
          target.classList.contains("service-card"),
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isFinePointer, prefersReducedMotion]);

  if (!mousePos.visible || !isFinePointer || prefersReducedMotion) return null;

  return (
    <LazyMotion features={domAnimation}>
    <>
      <m.div
        className="fixed top-0 left-0 size-5 border-2 border-indigo-500 rounded-full pointer-events-none z-[999999]"
        animate={{
          x: mousePos.x - 10,
          y: mousePos.y - 10,
          scale: isHovering ? 1.6 : 1,
          backgroundColor: isHovering
            ? "rgba(99, 102, 241, 0.15)"
            : "rgba(99, 102, 241, 0)",
        }}
        transition={{ type: "spring", damping: 24, stiffness: 280, mass: 0.5 }}
      />
      <m.div
        className="fixed top-0 left-0 size-1.5 bg-indigo-500 rounded-full pointer-events-none z-[999999]"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.1 }}
      />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  </LazyMotion>
  );
}
