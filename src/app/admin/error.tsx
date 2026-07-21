"use client";

import Link from "next/link";

export default function AdminError({
  _error,
  reset,
}: {
  _error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="size-14 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-xl text-[#fb2c36] font-bold">!</span>
        </div>
        <h1 className="text-2xl font-bold text-[#020617] dark:text-white mb-2">
          Admin area error
        </h1>
        <p className="text-slate-600 dark:text-[#314158] mb-8 leading-relaxed">
          Something went wrong in the admin panel. Your session may have expired
          or a request failed.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => reset()} className="btn-primary">
            Try again
          </button>
          <Link href="/admin/login" className="btn-secondary">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
