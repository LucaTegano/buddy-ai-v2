"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SparklesIcon } from '@/app/components/icons';

const Header: React.FC = () => {
    const { t } = useTranslation();
    return (
        <header className="flex items-center justify-between p-4 shrink-0 border-b border-border-subtle">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <SparklesIcon className="w-7 h-7 text-brand-primary"/>
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                        {t('header.title')}
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;