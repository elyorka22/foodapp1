export type Category = {
  id: string;
  title: string;
  emoji: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cover: string;
  logo: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  category: string;
  distance: string;
  open: boolean;
  favorite: boolean;
};

export type Product = {
  id: string;
  restaurantId: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  description: string;
};

export type Promo = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
};
