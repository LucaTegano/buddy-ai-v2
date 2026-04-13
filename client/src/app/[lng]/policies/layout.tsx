// src/app/policies/layout.tsx
import { PolicySidebar } from '@/features/policies/components/PolicySidebar';

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-primary text-text-primary min-h-screen">
      <PolicySidebar />
      <main className="flex-1 ml-64 min-h-screen"> 
        {/* ml-64 deve corrispondere alla larghezza (w-64) della sidebar */}
        <div className="max-w-5xl mx-auto min-h-screen bg-surface shadow-sm border-x border-border-subtle">
          {children}
        </div>
      </main>
    </div>
  );
}