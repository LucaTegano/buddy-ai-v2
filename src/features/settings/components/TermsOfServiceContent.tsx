"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Renders the content for the Terms of Service.
 * This is a pure presentational component designed to be used inside
 * a modal wrapper (like InterceptedModal) or a full-page layout.
 * It contains no closing logic or full-screen layout styles.
 */
const TermsOfServiceContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-surface w-full flex flex-col">
      {/* Header Section */}
      <header className="text-left py-10 border-b border-border-subtle">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
          {t('tos.title', 'Terms of Service')}
        </h1>
        <p className="text-text-secondary mt-4 text-lg">{t('tos.date', 'Effective Date: July 24, 2024')}</p>
      </header>

      {/* Content Area */}
      <div className="py-10">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('tos.section1Title', '1. Introduction')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('tos.section1Content', 'Welcome to Study Buddy AI ("we," "our," "us"). These Terms of Service ("Terms") govern your use of our application and services. By accessing or using our service, you agree to be bound by these Terms. This is a mock document for demonstration purposes and holds no legal weight.')}
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('tos.section2Title', '2. Use of Service')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('tos.section2Content', 'Study Buddy AI is provided for educational and personal use only. You agree not to use the service for any illegal or unauthorized purpose. You are responsible for any content you provide and your interactions with the AI. We reserve the right to suspend or terminate your access to the service at any time, without notice, for conduct that we believe violates these Terms.')}
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('tos.section3Title', '3. User Content')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('tos.section3Content', 'You retain ownership of the notes and content you create ("User Content"). By using the service, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your User Content solely for the purpose of operating and providing the service to you. We do not claim any ownership rights over your data.')}
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('tos.section4Title', '4. Disclaimers')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('tos.section4Content', 'The service is provided on an "as is" and "as available" basis. While we strive to provide accurate and helpful information, the AI-generated content may contain errors or inaccuracies. We do not warrant that the service will be uninterrupted, error-free, or secure. You should not rely on the AI for critical advice and should always verify important information.')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('tos.section5Title', '5. Limitation of Liability')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('tos.section5Content', 'To the fullest extent permitted by law, Study Buddy AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceContent;