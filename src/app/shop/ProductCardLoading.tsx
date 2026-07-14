export default function ProductCardLoading() {
  return (
    <div className="card overflow-hidden" aria-hidden>
      <div className="h-56 sm:h-64 bg-slate-100 dark:bg-slate-800 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-5 w-3/5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-16 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="h-7 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-9 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
