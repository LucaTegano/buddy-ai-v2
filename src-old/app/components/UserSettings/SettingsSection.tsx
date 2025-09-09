import React from 'react';

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
    hasBorder?: boolean;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children, hasBorder = true }) => {
    return (
        <div className={`p-4 sm:p-6 ${hasBorder ? 'border-t border-border-subtle' : ''}`}>
            <h2 className="text-xs font-semibold text-brand-subtle-2 uppercase tracking-wider mb-3">{title}</h2>
            {children}
        </div>
    );
};

export default SettingsSection;