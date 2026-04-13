// src/app/settings/page.tsx (example)

import { SettingsDialogContent } from "@/features/settings/components/SettingsDialogContent";

export default function SettingsPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-scn-background overflow-hidden p-4">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/10 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-blue/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent-purple/10 blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <SettingsDialogContent />
      </div>
    </main>
  );
}