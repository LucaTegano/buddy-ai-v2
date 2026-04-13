"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // The CSS variables here must be updated to use the 'scn-' prefix.
      style={
        {
          "--normal-bg": "var(--scn-popover)",
          "--normal-text": "var(--scn-popover-foreground)",
          "--normal-border": "var(--scn-border)",
          "--success-bg": "var(--bg-surface)",
          "--success-text": "var(--text-primary)",
          "--success-border": "var(--feedback-success)",
          "--error-bg": "var(--bg-surface)",
          "--error-text": "var(--text-primary)",
          "--error-border": "var(--feedback-error)",
          "--warning-bg": "var(--bg-surface)",
          "--warning-text": "var(--text-primary)",
          "--warning-border": "var(--feedback-warning)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }