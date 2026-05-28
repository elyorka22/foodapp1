import { LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)] sm:p-5">
      <div className="mb-3 inline-flex rounded-2xl bg-[rgb(var(--primary))]/15 p-2 text-[rgb(var(--primary))]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm text-neutral-500">{title}</p>
      <p className="mt-1 text-xl font-semibold sm:text-2xl">{value}</p>
    </article>
  );
}
