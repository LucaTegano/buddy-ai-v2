// src/app/settings/page.tsx (example)

import { SettingsDialogContent } from "@/features/settings/components/SettingsDialogContent";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4">
      <SettingsDialogContent />
    </main>
  );
}