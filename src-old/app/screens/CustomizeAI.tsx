"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon, SparklesIcon } from '@/app/components/icons';
import { useAppStore } from '../store/useAppStore';
import { Personality } from '@/app/models/types';

const CustomizeAI: React.FC = () => {
  const { t } = useTranslation();
  const { 
    closeCustomizeAI,
    personality,
    setPersonality,
    customInstructions,
    setCustomInstructions,
    isCustomizationEnabled,
    setIsCustomizationEnabled
  } = useAppStore();

  const personalityOptions: { value: Personality, label: string }[] = [
    { value: 'default', label: t('customizeAI.personalityAdaptive') },
    { value: 'robot', label: t('customizeAI.personalityDirect') },
    { value: 'nerd', label: t('customizeAI.personalityPassionate') },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-surface rounded-2xl shadow-lg shadow-subtle overflow-hidden">
          <div className="p-6 sm:p-8">
            <header className="relative flex items-center justify-center mb-10">
              <button
                onClick={closeCustomizeAI}
                className="absolute left-0 p-2 rounded-full hover:bg-hover/60 transition-colors"
                aria-label={t('customizeAI.goBack')}
              >
                <ArrowLeftIcon className="w-6 h-6 text-text-secondary" />
              </button>
              <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                {t('customizeAI.title')}
              </h1>
            </header>

            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-brand-primary"/>
                    <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{t('customizeAI.behavior')}</h2>
                </div>
                
                {/* === MODIFIED SECTION START === */}
                <div className="flex items-center justify-between p-3 -m-3 rounded-lg hover:bg-hover transition-colors">
                    <label htmlFor="enable-customization" className="text-sm font-medium text-text-primary cursor-pointer flex-grow">
                        {t('customizeAI.enable')}
                    </label>
                    <button
                        id="enable-customization"
                        onClick={() => setIsCustomizationEnabled(!isCustomizationEnabled)}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors flex-shrink-0 ${isCustomizationEnabled ? 'bg-brand-subtle-2' : 'bg-text-disabled'}`}
                        aria-label={t('customizeAI.enable')}
                    >
                        <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            isCustomizationEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                        />
                    </button>
                </div>
                {/* === MODIFIED SECTION END === */}

                <div className={`space-y-6 mt-2 pt-2 transition-opacity duration-300 ${isCustomizationEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-3">{t('customizeAI.personality')}</label>
                        <div className="grid grid-cols-3 gap-3">
                            {personalityOptions.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setPersonality(opt.value)}
                                    disabled={!isCustomizationEnabled}
                                    className={`text-center px-3 py-4 rounded-lg border-2 transition-colors disabled:cursor-not-allowed ${
                                        personality === opt.value
                                            ? 'border-brand-primary bg-brand-subtle'
                                            : 'border-border-subtle hover:border-brand-hover bg-surface'
                                    }`}
                                >
                                    <span className="block text-sm font-semibold text-text-primary">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="custom-instructions" className="block text-sm font-medium text-text-primary mb-3">
                            {t('customizeAI.otherThingsToKnow')}
                        </label>
                        <textarea
                            id="custom-instructions"
                            rows={5}
                            value={customInstructions}
                            onChange={(e) => setCustomInstructions(e.target.value)}
                            placeholder={t('customizeAI.otherThingsPlaceholder')}
                            disabled={!isCustomizationEnabled}
                            className="w-full px-3 py-2 text-sm bg-primary text-text-primary rounded-lg border border-border-subtle focus:ring-2 focus:ring-brand-primary focus:border-brand-primary focus:outline-none transition-colors duration-300 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeAI;