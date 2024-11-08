import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/signin', '/signup'];

// Define routes that require admin access
const adminRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }

  try {
    // Allow access to public routes without authentication
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    // Check authentication
    const authResponse = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
      headers: request.headers
    });

    if (!authResponse.ok) {
      // If not authenticated and trying to access protected route, redirect to signin
      if (!publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }
      return NextResponse.next();
    }

    const session = await authResponse.json();

    // If authenticated user tries to access auth pages, redirect to dashboard
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Check admin access
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (session?.user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    // Add user info to headers for use in components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-role', session?.user?.role || '');
    requestHeaders.set('x-user-id', session?.user?.id || '');

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, redirect to signin for safety
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Match all routes except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
