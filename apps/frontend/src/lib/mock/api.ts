import { products, restaurants } from './data';

const PAGE_SIZE = 6;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchRestaurantsPage(pageParam: number) {
  await sleep(550);
  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const items = restaurants.slice(start, end);

  return {
    items,
    nextCursor: end < restaurants.length ? pageParam + 1 : null,
  };
}

export async function fetchRestaurantById(id: string) {
  await sleep(250);
  return restaurants.find((item) => item.id === id) ?? null;
}

export async function fetchProductById(id: string) {
  await sleep(250);
  return products.find((item) => item.id === id) ?? null;
}

export async function fetchProductsByRestaurant(restaurantId: string) {
  await sleep(300);
  return products.filter((item) => item.restaurantId === restaurantId).slice(0, 8);
}
