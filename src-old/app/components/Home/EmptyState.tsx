import React from 'react';

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, subtitle }) => (
    <div className="text-center p-8 bg-primary rounded-lg border-2 border-dashed border-border-subtle">
        <div className="mx-auto w-12 h-12 text-text-disabled">{icon}</div>
        <h3 className="mt-4 text-sm font-semibold text-text-primary">{title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
    </div>
);

export default EmptyState;