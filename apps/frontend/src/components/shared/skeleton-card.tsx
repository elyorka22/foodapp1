export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-[var(--shadow-soft)]">
      <div className="shimmer h-36 w-full rounded-2xl" />
      <div className="mt-3 space-y-2">
        <div className="shimmer h-4 w-2/3 rounded" />
        <div className="shimmer h-3 w-1/2 rounded" />
        <div className="shimmer h-3 w-1/3 rounded" />
      </div>
    </div>
  );
}
