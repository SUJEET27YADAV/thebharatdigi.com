import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={twMerge("cursor-pointer", className)}>
      <Image
        src="/logo.png"
        alt="The Bharat Digital"
        width={200}
        height={200}
        priority
        quality={80}
        className="h-full w-auto object-contain rounded"
      />
    </div>
  );
}
