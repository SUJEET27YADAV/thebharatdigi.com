export default function ServiceCardLoading() {
  return (
    <div className="relative w-full max-w-md card p-6 md:p-8">
      <div className="absolute -top-3 right-6 w-20 h-6 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
      <div className="size-14 border mb-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      <h3 className="w-3/5 h-10 mb-3 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
      <p className="w-full h-24 mb-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      <div className="w-full space-y-2 mb-6">
        <div className="w-1/2 h-8 bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    </div>
  );
}
