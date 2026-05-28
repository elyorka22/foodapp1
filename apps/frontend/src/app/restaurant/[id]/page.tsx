import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/food/product-card';
import { fetchProductsByRestaurant, fetchRestaurantById } from '@/lib/mock/api';

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = await fetchRestaurantById(id);
  if (!restaurant) return notFound();

  const foods = await fetchProductsByRestaurant(id);

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-4 pb-24">
      <Link href="/" className="text-sm text-[rgb(var(--primary))]">← Ortga</Link>

      <section className="overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-card)]">
        <div className="relative h-52 w-full">
          <Image src={restaurant.cover} alt={restaurant.name} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="space-y-2 p-4">
          <h1 className="text-2xl font-semibold">{restaurant.name}</h1>
          <p className="text-sm text-neutral-500">{restaurant.category} • {restaurant.distance} • {restaurant.deliveryTime}</p>
          <p className="text-sm text-emerald-600">{restaurant.deliveryFee}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Mashhur taomlar</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {foods.map((food) => (
            <ProductCard key={food.id} item={food} />
          ))}
        </div>
      </section>
    </main>
  );
}
