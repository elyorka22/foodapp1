import { Category, Product, Promo, Restaurant } from '@/types/food';

export const categories: Category[] = [
  { id: 'burger', title: 'Burger', emoji: '🍔' },
  { id: 'pizza', title: 'Pizza', emoji: '🍕' },
  { id: 'sushi', title: 'Sushi', emoji: '🍣' },
  { id: 'salad', title: 'Salatlar', emoji: '🥗' },
  { id: 'drinks', title: 'Ichimliklar', emoji: '🥤' },
  { id: 'all', title: 'Barchasi', emoji: '🍽️' },
];

export const promos: Promo[] = [
  {
    id: 'p1',
    title: 'Sevimli taomlaringiz eshigingizgacha!',
    subtitle: 'Tez yetkazib berish va issiq taomlar',
    cta: 'Buyurtma berish',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'p2',
    title: 'Birinchi buyurtmangizga -20% chegirma',
    subtitle: 'Promokod: HELLO20',
    cta: 'Foydalanish',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80',
  },
];

export const restaurants: Restaurant[] = Array.from({ length: 24 }).map((_, index) => ({
  id: `r-${index + 1}`,
  name: ['La Bella Pizza', 'Sushi Master', 'Fast Food House', 'Wok City'][index % 4],
  cover: [
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  ][index % 4],
  logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
  rating: Number((4.4 + ((index % 5) * 0.1)).toFixed(1)),
  deliveryTime: ['25-35 daq', '30-40 daq', '20-30 daq'][index % 3],
  deliveryFee: ['Yetkazish bepul', '7 000 so\'m', '10 000 so\'m'][index % 3],
  category: ['Pizza', 'Sushi', 'Burger', 'Asian'][index % 4],
  distance: `${(1.2 + (index % 6) * 0.4).toFixed(1)} km`,
  open: index % 7 !== 0,
  favorite: index % 4 === 0,
}));

export const products: Product[] = Array.from({ length: 18 }).map((_, index) => ({
  id: `p-${index + 1}`,
  restaurantId: `r-${(index % 6) + 1}`,
  title: ['Pepperoni Pizza', 'Dragon Sushi Set', 'Cheese Burger', 'Chicken Bowl'][index % 4],
  image: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
  ][index % 4],
  price: 35000 + (index % 5) * 5000,
  oldPrice: index % 3 === 0 ? 45000 + (index % 4) * 5000 : undefined,
  rating: Number((4.5 + (index % 4) * 0.1).toFixed(1)),
  description: 'Yangi ingredientlar, premium ta\'m va tez yetkazib berish.',
}));
