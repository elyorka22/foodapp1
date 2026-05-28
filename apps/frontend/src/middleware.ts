import { NextRequest, NextResponse } from 'next/server';

const adminRoutes = ['/admin'];
const restaurantRoutes = ['/restaurant'];
const courierRoutes = ['/courier'];
const protectedRoutes = [...adminRoutes, ...restaurantRoutes, ...courierRoutes];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('role')?.value;

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (adminRoutes.some((route) => path.startsWith(route)) && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (restaurantRoutes.some((route) => path.startsWith(route)) && role !== 'RESTAURANT') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (courierRoutes.some((route) => path.startsWith(route)) && role !== 'COURIER') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/restaurant/:path*', '/courier/:path*'],
};
