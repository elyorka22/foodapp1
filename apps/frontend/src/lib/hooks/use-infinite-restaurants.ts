'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRestaurantsPage } from '@/lib/mock/api';

export function useInfiniteRestaurants() {
  return useInfiniteQuery({
    queryKey: ['restaurants', 'infinite'],
    queryFn: ({ pageParam }) => fetchRestaurantsPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
