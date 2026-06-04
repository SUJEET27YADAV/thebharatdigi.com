export default function ServicesLoading() {
  return (
    <div className="min-h-[60vh] px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="h-10 w-56 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mx-auto mb-4" />
        <div className="h-5 w-80 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#0f172b] border border-slate-200 dark:border-[#314158]/30 rounded p-6">
              <div className="size-12 rounded-lg bg-slate-200 dark:bg-[#1e293b] animate-pulse mb-4" />
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mb-1" />
              <div className="h-4 w-2/3 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
