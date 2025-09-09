"use client"

import App from "@/app/screens/App";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <App>{children}</App>;
}