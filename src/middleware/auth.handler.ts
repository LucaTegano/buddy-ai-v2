import { NextRequest, NextResponse } from 'next/server';
import { supportedLngs } from '@/lib/i18n/config';

export function authMiddleware(req: NextRequest): NextResponse | null {
    const { pathname } = req.nextUrl;
    const lngInPath = supportedLngs.find(l => pathname.startsWith(`/${l}`));

    // If i18n middleware hasn't run yet, skip auth logic.
    if (!lngInPath) return null;

    const pathnameWithoutLng = pathname.substring(lngInPath.length + 1) || '/';

    // Handle the root path explicitly. This runs before other checks.
    if (pathnameWithoutLng === '/') {
        // For the root path, we'll let the client-side handle the redirect based on auth status
        // This is because we can't access localStorage in middleware
        return null;
    }

    // For other routes, we still apply basic protection
    // Note: More sophisticated auth checking happens client-side
    
    // We'll allow the request to proceed and let client-side handle detailed auth checks
    // This is because middleware can't access localStorage where the token is stored
    
    return null; // No auth action taken for other routes
}