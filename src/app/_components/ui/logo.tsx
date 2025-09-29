import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={twMerge('cursor-pointer', className)}>
      <Image
        src="/logo.png"
        alt="The Bharat Digital"
        width={1200}
        height={1200}
        priority
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}
