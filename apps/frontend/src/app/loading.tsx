import { SkeletonCard } from '@/components/shared/skeleton-card';

export default function GlobalLoading() {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
