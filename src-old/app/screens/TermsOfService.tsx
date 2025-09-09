"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import ThemeToggleButton from '@/app/components/ThemeToggleButton';
import { useAppStore } from '../store/useAppStore';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();
  const { closeTos, theme, toggleTheme } = useAppStore();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-primary p-4 sm:p-6">
      <ThemeToggleButton theme={theme} onToggle={toggleTheme} className="absolute top-4 right-4 sm:top-6 sm:right-6" />
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">
            {t('tos.title')}
          </h1>
          <p className="text-text-secondary mt-2">Effective Date: July 24, 2024</p>
        </header>
        <div className="bg-surface p-6 sm:p-8 rounded-2xl shadow-lg shadow-subtle max-h-[60vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-text-primary mb-4">1. Introduction</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            Welcome to Study Buddy AI ("we," "our," "us"). These Terms of Service ("Terms") govern your use of our application and services. By accessing or using our service, you agree to be bound by these Terms. This is a mock document for demonstration purposes and holds no legal weight.
          </p>
          <h2 className="text-xl font-semibold text-text-primary mb-4">2. Use of Service</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            Study Buddy AI is provided for educational and personal use only. You agree not to use the service for any illegal or unauthorized purpose. You are responsible for any content you provide and your interactions with the AI. We reserve the right to suspend or terminate your access to the service at any time, without notice, for conduct that we believe violates these Terms.
          </p>
          <h2 className="text-xl font-semibold text-text-primary mb-4">3. User Content</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            You retain ownership of the notes and content you create ("User Content"). By using the service, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your User Content solely for the purpose of operating and providing the service to you. We do not claim any ownership rights over your data.
          </p>
          <h2 className="text-xl font-semibold text-text-primary mb-4">4. Disclaimers</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            The service is provided on an "as is" and "as available" basis. While we strive to provide accurate and helpful information, the AI-generated content may contain errors or inaccuracies. We do not warrant that the service will be uninterrupted, error-free, or secure. You should not rely on the AI for critical advice and should always verify important information.
          </p>
          <h2 className="text-xl font-semibold text-text-primary mb-4">5. Limitation of Liability</h2>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed">
            To the fullest extent permitted by law, Study Buddy AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={closeTos}
            className="px-6 py-2.5 font-semibold text-on-brand bg-brand-primary rounded-lg hover:bg-brand-hover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
          >
            {t('tos.backToLogin')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;