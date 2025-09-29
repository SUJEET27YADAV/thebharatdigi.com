import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={twMerge(
        'w-full px-4 py-2 flex items-center sm:p-0 sm:py-1 max-sm:bg-zinc-600/20 rounded backdrop-blur-md overflow-hidden',
        className
      )}
    >
      <p className="w-full flex items-center gap-1">{children}</p>
      <span className="sm:hidden">
        <ChevronRightIcon fontSize="inherit" />
      </span>
    </Link>
  );
}
