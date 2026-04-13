import { useCommandSearch } from '@/lib/hooks/use-command-search';
import { useRouter } from 'next/navigation';

// Define the type for our shortcuts
export interface Shortcut {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: (e: KeyboardEvent) => void;
}

// Hook to manage all keyboard shortcuts
export const useSearchShortcuts = (onClose: () => void) => {
  const { toggle } = useCommandSearch();
  const router = useRouter();

  // Cmd/Ctrl + K - Toggle search command
  const toggleSearchCommand = (e: KeyboardEvent) => {
    e.preventDefault();
    toggle();
  };

  // Cmd/Ctrl + S - Navigate to general settings
  const navigateToSettings = (e: KeyboardEvent) => {
    e.preventDefault();
    router.push('/settings');
    onClose();
  };

  // Define all shortcuts
  const shortcuts: Shortcut[] = [
    {
      key: 'k',
      metaKey: true,
      handler: toggleSearchCommand,
    },
    {
      key: 'k',
      ctrlKey: true,
      handler: toggleSearchCommand,
    },
    {
      key: 's',
      metaKey: true,
      handler: navigateToSettings,
    },
    {
      key: 's',
      ctrlKey: true,
      handler: navigateToSettings,
    },
  ];

  return { shortcuts };
};