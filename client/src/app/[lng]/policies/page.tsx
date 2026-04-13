// app/policies/page.tsx
"use client";

import React from 'react';
import PrivacyPolicyContent from '@/features/settings/components/PrivacyPolicyContent';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-surface">
      <PrivacyPolicyContent />
    </main>
  );
}
