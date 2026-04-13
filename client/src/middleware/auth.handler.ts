import { NextRequest, NextResponse } from 'next/server';
import { supportedLngs } from '@/lib/i18n/config';

export function authMiddleware(req: NextRequest): NextResponse | null {
    const { pathname } = req.nextUrl;
    const lngInPath = supportedLngs.find(l => pathname.startsWith(`/${l}`));

    // If i18n middleware hasn't run yet, skip auth logic.
    if (!lngInPath) return null;

    const pathnameWithoutLng = pathname.substring(lngInPath.length + 1) || '/';
    const token = req.cookies.get('authToken')?.value;

    // Define protected routes (routes inside (main) and (settings))
    const isProtectedRoute = !pathnameWithoutLng.startsWith('/login') && 
                            !pathnameWithoutLng.startsWith('/sign-up') &&
                            !pathnameWithoutLng.startsWith('/verify') &&
                            !pathnameWithoutLng.startsWith('/policies') &&
                            pathnameWithoutLng !== '/';

    // Define auth-only routes (login, sign-up, etc.)
    const isAuthRoute = pathnameWithoutLng.startsWith('/login') || 
                       pathnameWithoutLng.startsWith('/sign-up') ||
                       pathnameWithoutLng.startsWith('/verify');

    // 1. If it's a protected route and there's no token, redirect to login
    if (isProtectedRoute && !token) {
        const url = req.nextUrl.clone();
        url.pathname = `/${lngInPath}/login`;
        return NextResponse.redirect(url);
    }

    // 2. If it's an auth route and there's a token, redirect to home
    if (isAuthRoute && token) {
        const url = req.nextUrl.clone();
        url.pathname = `/${lngInPath}/home`;
        return NextResponse.redirect(url);
    }

    // 3. For the root path, if authenticated, redirect to home
    if (pathnameWithoutLng === '/' && token) {
        const url = req.nextUrl.clone();
        url.pathname = `/${lngInPath}/home`;
        return NextResponse.redirect(url);
    }

    return null; // No auth action taken for other routes
}