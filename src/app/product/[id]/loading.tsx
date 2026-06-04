export default function ProductLoading() {
  return (
    <div className="min-h-[60vh] px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-[4/3] bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
            <div className="h-5 w-1/4 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
            <div className="pt-4">
              <div className="h-12 w-40 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
