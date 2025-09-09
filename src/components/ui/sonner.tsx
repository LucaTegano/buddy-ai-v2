"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-bg-surface group-[.toaster]:text-text-primary group-[.toaster]:border-border-subtle group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-text-secondary",
          actionButton: "group-[.toast]:bg-brand-primary group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-bg-hover group-[.toast]:text-text-secondary",
          success: "group-[.toaster]:bg-bg-surface group-[.toaster]:text-text-primary group-[.toaster]:border-feedback-success",
          error: "group-[.toaster]:bg-bg-surface group-[.toaster]:text-text-primary group-[.toaster]:border-feedback-error",
          warning: "group-[.toaster]:bg-bg-surface group-[.toaster]:text-text-primary group-[.toaster]:border-feedback-warning",
        },
        style: {
          "--normal-bg": "var(--bg-surface)",
          "--normal-text": "var(--text-primary)",
          "--normal-border": "var(--border-subtle)",
          "--success-bg": "var(--bg-surface)",
          "--success-text": "var(--text-primary)",
          "--success-border": "var(--feedback-success)",
          "--error-bg": "var(--bg-surface)",
          "--error-text": "var(--text-primary)",
          "--error-border": "var(--feedback-error)",
          "--warning-bg": "var(--bg-surface)",
          "--warning-text": "var(--text-primary)",
          "--warning-border": "var(--feedback-warning)",
        } as React.CSSProperties,
      }}
      {...props}
    />
  )
}

export { Toaster }
