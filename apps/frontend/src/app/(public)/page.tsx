'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { AppHeader } from '@/components/shared/app-header';
import { SearchBar } from '@/components/shared/search-bar';
import { PromoBanner } from '@/components/food/promo-banner';
import { CategorySlider } from '@/components/food/category-slider';
import { RestaurantCard } from '@/components/food/restaurant-card';
import { ProductCard } from '@/components/food/product-card';
import { BottomNavigation } from '@/components/shared/bottom-navigation';
import { CartDrawer } from '@/components/shared/cart-drawer';
import { EmptyState } from '@/components/shared/empty-state';
import { SkeletonCard } from '@/components/shared/skeleton-card';
import { LoadingOverlay } from '@/components/shared/loading-overlay';
import { categories, products, promos } from '@/lib/mock/data';
import { useInfiniteRestaurants } from '@/lib/hooks/use-infinite-restaurants';
import { useIntersection } from '@/lib/hooks/use-intersection';

export default function HomePage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteRestaurants();

  const allRestaurants = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  const sentinelRef = useIntersection(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, Boolean(hasNextPage));

  const pullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsRefreshing(false);
    toast.success('Kontent yangilandi');
  };

  return (
    <div className="pb-24">
      <AppHeader />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-4">
        <SearchBar />

        <button
          onClick={pullToRefresh}
          className="rounded-2xl bg-white px-4 py-2 text-xs font-medium text-neutral-600 shadow-[var(--shadow-soft)]"
        >
          Pull to refresh
        </button>

        <section className="-mx-4 snap-x overflow-x-auto px-4">
          <div className="flex min-w-full gap-4">
            {promos.map((promo) => (
              <PromoBanner key={promo.id} promo={promo} />
            ))}
          </div>
        </section>

        <CategorySlider items={categories} />

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Mashhur restoranlar</h2>
            <button className="text-sm font-medium text-[rgb(var(--primary))]">Barchasini ko'rish</button>
          </div>

          {isPending ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : allRestaurants.length === 0 ? (
            <EmptyState title="Restoranlar topilmadi" subtitle="Filtrlarni yangilang yoki keyinroq urinib ko'ring." />
          ) : (
            <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {allRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} item={restaurant} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <div ref={sentinelRef} className="h-6" />
          {isFetchingNextPage ? <p className="text-center text-sm text-neutral-500">Yana yuklanmoqda...</p> : null}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Tavsiya etilgan taomlar</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation />
      <CartDrawer />
      <LoadingOverlay isVisible={isRefreshing} />
    </div>
  );
}
