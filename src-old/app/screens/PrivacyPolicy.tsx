"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import ThemeToggleButton from '@/app/components/ThemeToggleButton';
import { useAppStore } from '@/app/store/useAppStore';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  const { closePrivacyPolicy, theme, toggleTheme } = useAppStore();
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-primary p-4 sm:p-6">
      <ThemeToggleButton theme={theme} onToggle={toggleTheme} className="absolute top-4 right-4 sm:top-6 sm:right-6" />
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">
            {t('privacy.title')}
          </h1>
          <p className="text-text-secondary mt-2">Last Updated: July 24, 2024</p>
        </header>
        <div className="bg-surface p-6 sm:p-8 rounded-2xl shadow-lg shadow-subtle max-h-[60vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-text-primary mb-4">1. Information We Collect</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            When you sign in with Google, we collect basic profile information necessary for the app's functionality, such as your name and profile picture. We also temporarily process the content you provide to the chat and scratchpad to deliver the AI-powered features. This is a mock document for demonstration purposes; no actual data is collected or stored long-term.
          </p>
          <h2 className="text-xl font-semibold text-text-primary mb-4">2. How We Use Information</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            The information collected is used solely to provide and improve the service. Your name and picture personalize your user experience. The text you input is sent to the Gemini API to generate responses and perform actions like summarizing or proofreading. We do not use your data for advertising or any other purpose.
          </p>
          <h2 className="text-xl font-semibold text-text-primary mb-4">3. Data Sharing and Storage</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            We do not share your personal information with third parties, except as required to provide the service (e.g., sending prompts to the Google Gemini API). Your chat history and scratchpad content are maintained only for the duration of your session and are not stored permanently on our servers.
          </p>
          <h2 className="text-xl font-semibold text-text-primary mb-4">4. Data Security</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            We take reasonable measures to protect the information you provide. However, no electronic transmission or storage is 100% secure. We cannot guarantee the absolute security of your data.
          </p>
          <h2 className="text-xl font-semibold text-text-primary mb-4">5. Changes to This Policy</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={closePrivacyPolicy}
            className="px-6 py-2.5 font-semibold text-on-brand bg-brand-primary rounded-lg hover:bg-brand-hover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
          >
            {t('tos.backToLogin')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;