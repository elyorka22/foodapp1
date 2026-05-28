export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-lg font-semibold">Food Delivery Platform</h1>
        <button className="rounded-md border border-slate-300 px-3 py-1 text-sm dark:border-slate-700">
          Toggle Theme
        </button>
      </div>
    </header>
  );
}
