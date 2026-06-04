export default function SEOAuditLoading() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#020617]">
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="h-6 w-40 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mx-auto mb-6" />
          <div className="h-12 w-3/4 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mx-auto mb-4" />
          <div className="h-5 w-2/3 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mx-auto mb-8" />
          <div className="flex justify-center gap-4">
            <div className="h-12 w-36 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
            <div className="h-12 w-36 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
          </div>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="h-10 w-72 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-[#0f172b] border border-slate-200 dark:border-[#314158]/30 rounded p-5">
                <div className="size-10 rounded bg-slate-200 dark:bg-[#1e293b] animate-pulse mb-3" />
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mb-1" />
                <div className="h-3 w-full bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse mb-1" />
                <div className="h-3 w-2/3 bg-slate-200 dark:bg-[#1e293b] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
