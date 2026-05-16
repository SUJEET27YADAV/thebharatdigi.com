export default function ProductCardLoading() {
  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
      {/* Product Badge */}
      <div className="absolute top-4 right-4 w-26 h-6 bg-slate-300 px-3 py-1 rounded-full animate-pulse" />

      {/* Icon/Preview Area */}
      <div className="w-full h-52 bg-slate-100 dark:bg-slate-800 animate-pulse" />

      {/* Details */}
      <div className="p-6">
        <h3 className="w-60 h-12 bg-slate-300 rounded-lg animate-pulse mb-2" />
        <p className="w-full h-20 bg-slate-300 rounded-lg animate-pulse mb-4" />

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[0, 1, 2, 3].map((f) => (
            <span
              key={f}
              className="w-24 h-6 bg-slate-300 px-2 py-1 rounded animate-pulse"
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800 dark:border-slate-100">
          <span className="w-20 h-12 bg-slate-300 rounded-lg animate-pulse" />
          <button className="w-36 h-12 bg-slate-300 px-4 py-2 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
