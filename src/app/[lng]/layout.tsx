// /src/app/[lng]/layout.tsx

import { SearchCommand } from "@/features/search/components/SearchCommand/SearchCommand";
import I18nProvider from "@/lib/i18n/I18nProvider";
import React from "react";

// This comment explicitly says: "I know there's a type error here because of the
// Next.js canary version, and I'm intentionally ignoring it for now."
// at-ts-expect-error Known type issue with Next.js 15 canary, will be removed on stable release
export default async function LngLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <I18nProvider lng={params.lng}>
      <SearchCommand />
      {children}
    </I18nProvider>
  );
}