import { Bell, MapPin } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-100 bg-[rgb(var(--bg))]/95 px-4 pb-3 pt-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="space-y-1">
          <p className="flex items-center gap-1 text-lg font-semibold">
            <MapPin className="h-4 w-4 text-[rgb(var(--primary))]" /> Toshkent
          </p>
          <p className="text-sm text-neutral-500">Chilonzor tumani, 20-mavze</p>
        </div>
        <button className="relative rounded-2xl bg-white p-3 shadow-[var(--shadow-card)]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[rgb(var(--primary))]" />
        </button>
      </div>
    </header>
  );
}
