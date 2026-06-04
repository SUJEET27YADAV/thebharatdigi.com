export default function AdminLoading() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-48 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
        <div className="h-10 w-40 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#0f172b] border border-slate-200 dark:border-[#314158]/30 rounded p-6">
            <div className="h-4 w-20 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mb-3" />
            <div className="h-8 w-16 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-[#0f172b] border border-slate-200 dark:border-[#314158]/30 rounded overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-[#314158]/30">
          <div className="h-6 w-40 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b border-slate-200 dark:border-[#314158]/30 last:border-0">
            <div className="flex items-center gap-4">
              <div className="h-4 w-3/12 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
              <div className="h-4 w-2/12 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
              <div className="h-4 w-3/12 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
              <div className="h-4 w-2/12 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
              <div className="h-8 w-20 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
