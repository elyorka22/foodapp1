'use client';

import { useMemo, useState } from 'react';
import { products, restaurants } from '@/lib/mock/data';
import { ProductCard } from '@/components/food/product-card';
import { RestaurantCard } from '@/components/food/restaurant-card';
import { PageShell } from '@/components/shared/page-shell';
import { SearchBar } from '@/components/shared/search-bar';
import { EmptyState } from '@/components/shared/empty-state';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredRestaurants = useMemo(
    () => restaurants.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const filteredProducts = useMemo(
    () => products.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <PageShell title="Qidirish" subtitle="Restoran va taomlarni toping">
      <SearchBar value={query} onChange={setQuery} />

      {!filteredRestaurants.length && !filteredProducts.length ? (
        <EmptyState title="Natija topilmadi" subtitle="So'rovni o'zgartirib qayta urinib ko'ring." />
      ) : null}

      {filteredRestaurants.length ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Restoranlar</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredRestaurants.slice(0, 6).map((item) => (
              <RestaurantCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}

      {filteredProducts.length ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Taomlar</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.slice(0, 8).map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
