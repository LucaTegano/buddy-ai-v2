import { NextRequest, NextResponse } from 'next/server';
import { i18nMiddleware } from './middleware/i18n.handler';
import { authMiddleware } from './middleware/auth.handler';
import { supportedLngs } from './lib/i18n/config';

const I18N_COOKIE_NAME = 'i18next-lng';

export function middleware(req: NextRequest) {
    // 1. Run i18n middleware first. If it returns a response (a redirect), stop here.
    const i18nResponse = i18nMiddleware(req);
    if (i18nResponse) return i18nResponse;

    // 2. Run auth middleware. If it returns a response, stop here.
    const authResponse = authMiddleware(req);
    if (authResponse) return authResponse;

    // 3. If no middleware returned a redirect, prepare the final response.
    const response = NextResponse.next();
    
    // Attach any necessary headers or cookies (like the i18n cookie).
    const { pathname } = req.nextUrl;
    const lngInPath = supportedLngs.find(l => pathname.startsWith(`/${l}`));
    if (lngInPath) {
        response.cookies.set(I18N_COOKIE_NAME, lngInPath);
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
    ],
};