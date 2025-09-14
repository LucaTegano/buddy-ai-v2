// src/app/(main)/layout.tsx
import { PolicySidebar } from '@/features/policies/components/PolicySidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <PolicySidebar />
      <main className="flex-1 ml-60"> 
        {/* ml-60 deve corrispondere alla larghezza (w-60) della sidebar */}
        {children}
      </main>
    </div>
  );
}