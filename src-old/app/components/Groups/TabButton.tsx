import React from 'react';

interface TabButtonProps<T extends string> {
    tab: T;
    activeTab: T;
    label: string;
    icon: React.ReactNode;
    onClick: (tab: T) => void;
}

// Define the component as a generic function.
function TabButton<T extends string>({
    tab,
    activeTab,
    label,
    icon,
    onClick,
}: TabButtonProps<T>) {
    return (
        <button
            onClick={() => onClick(tab)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab 
                    ? 'text-brand-primary dark:text-brand-light bg-brand-subtle dark:bg-surface-hover' 
                    : 'text-text-secondary hover:bg-hover/60 dark:hover:bg-surface-hover/60'
            }`}
        >
            {icon}
            {label}
        </button>
    );
}

export default TabButton;