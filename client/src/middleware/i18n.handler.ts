// FILE: middleware/i18n.handler.ts

import { NextRequest, NextResponse } from 'next/server';
import parser from 'accept-language-parser';
import { fallbackLng, supportedLngs } from '@/lib/i18n/config';

const I18N_COOKIE_NAME = 'i18next-lng';

function getLocale(req: NextRequest): string {
    let lng: string | undefined | null;
  
    if (req.cookies.has(I18N_COOKIE_NAME)) {
        lng = req.cookies.get(I18N_COOKIE_NAME)?.value;
    }
    if (!lng) {
        const acceptLangHeader = req.headers.get('Accept-Language');
        if (acceptLangHeader) {
            lng = parser.pick(supportedLngs, acceptLangHeader);
        }
    }
    return lng || fallbackLng;
}

// This function handles ONLY the i18n logic
export function i18nMiddleware(req: NextRequest): NextResponse | null {
    // --- START OF FIX ---
    // Destructure BOTH pathname AND search from the request URL
    const { pathname, search } = req.nextUrl;
    // --- END OF FIX ---

    const pathnameIsMissingLocale = supportedLngs.every(
        (lng) => !pathname.startsWith(`/${lng}`) && pathname !== `/${lng}`
    );

    if (pathnameIsMissingLocale) {
        const lng = getLocale(req);
        
        // --- START OF FIX ---
        // Rebuild the URL, but now APPEND the original search string.
        // This will preserve `?email=...` and any other query parameters.
        const newUrl = new URL(`/${lng}${pathname}${search}`, req.url);
        // --- END OF FIX ---
        
        return NextResponse.redirect(newUrl);
    }

    return null; // Return null if no action is taken
}