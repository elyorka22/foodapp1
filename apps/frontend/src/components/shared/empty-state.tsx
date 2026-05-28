import { SearchX } from 'lucide-react';

export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-[var(--shadow-soft)]">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#FFF4EA]">
        <SearchX className="h-6 w-6 text-[rgb(var(--primary))]" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}
