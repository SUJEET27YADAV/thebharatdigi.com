export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 border-2 border-indigo-600 dark:border-[#ac4bff] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 dark:text-[#314158]">Loading...</p>
      </div>
    </div>
  );
}
