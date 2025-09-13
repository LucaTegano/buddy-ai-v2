// app/settings/layout.tsx
import React from "react";

// This layout receives the page content (children) and the modal content (modal)
export default function SettingsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children} {/* This will be your SettingsPage */}
      {modal}    {/* This will be your intercepted modal when the route matches */}
    </>
  );
}