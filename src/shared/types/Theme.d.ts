export interface ThemeToggleButtonProps {
    theme: 'light' | 'dark';
    onToggle: () => void;
    className?: string;
}