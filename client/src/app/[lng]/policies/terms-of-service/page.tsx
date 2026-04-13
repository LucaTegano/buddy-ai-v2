// app/terms-of-service/page.tsx
"use client";

import React from 'react';
import TermsOfServiceContent from '@/features/settings/components/TermsOfServiceContent';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-surface">
      <TermsOfServiceContent />
    </main>
  );
}
