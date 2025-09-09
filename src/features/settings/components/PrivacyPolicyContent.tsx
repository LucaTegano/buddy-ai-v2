"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Renders the content for the Privacy Policy.
 * This is a pure presentational component designed to be used inside
 * a modal wrapper (like InterceptedModal) or a full-page layout.
 * It contains no closing logic or full-screen layout styles.
 */
const PrivacyPolicyContent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-surface w-full flex flex-col">
      {/* Header Section */}
      <header className="text-left py-10 border-b border-border-subtle">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
          {t('privacy.title', 'Privacy Policy')}
        </h1>
        <p className="text-text-secondary mt-4 text-lg">{t('privacy.date', 'Last Updated: July 24, 2024')}</p>
      </header>

      {/* Content Area */}
      <div className="py-10">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('privacy.section1Title', '1. Information We Collect')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('privacy.section1Content', 'When you sign in with Google, we collect basic profile information necessary for the app\'s functionality, such as your name and profile picture. We also temporarily process the content you provide to the chat and scratchpad to deliver the AI-powered features. This is a mock document for demonstration purposes; no actual data is collected or stored long-term.')}
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('privacy.section2Title', '2. How We Use Information')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('privacy.section2Content', 'The information collected is used solely to provide and improve the service. Your name and picture personalize your user experience. The text you input is sent to the Gemini API to generate responses and perform actions like summarizing or proofreading. We do not use your data for advertising or any other purpose.')}
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('privacy.section3Title', '3. Data Sharing and Storage')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('privacy.section3Content', 'We do not share your personal information with third parties, except as required to provide the service (e.g., sending prompts to the Google Gemini API). Your chat history and scratchpad content are maintained only for the duration of your session and are not stored permanently on our servers.')}
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('privacy.section4Title', '4. Data Security')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('privacy.section4Content', 'We take reasonable measures to protect the information you provide. However, no electronic transmission or storage is 100% secure. We cannot guarantee the absolute security of your data.')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('privacy.section5Title', '5. Changes to This Policy')}</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('privacy.section5Content', 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;