"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Info, Eye, Lock, RefreshCw } from 'lucide-react';

/**
 * Renders the content for the Privacy Policy.
 * This is a pure presentational component designed to be used inside
 * a modal wrapper (like InterceptedModal) or a full-page layout.
 */
const PrivacyPolicyContent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-surface w-full flex flex-col">
      {/* Header Section */}
      <header className="px-8 py-16 text-center bg-gradient-to-b from-brand-subtle/20 to-surface border-b border-border-subtle">
        <div className="inline-flex items-center justify-center p-3 bg-brand-subtle rounded-2xl mb-6 shadow-sm">
          <ShieldCheck className="w-8 h-8 text-brand-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
          {t('privacy.title', 'Privacy Policy')}
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          {t('privacy.subtitle', 'We care about your data. Learn how we collect, use, and protect your personal information.')}
        </p>
        <div className="mt-8 inline-block px-4 py-1.5 bg-secondary/50 rounded-full text-sm font-medium text-text-secondary border border-border-subtle">
          {t('privacy.date', 'Last Updated: July 24, 2024')}
        </div>
      </header>

      {/* Content Area */}
      <div className="px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <section className="group">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t('privacy.section1Title', '1. Information We Collect')}
                </h2>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border-subtle/50">
                  <p className="text-text-secondary leading-relaxed">
                    {t('privacy.section1Content', 'When you sign in with Google, we collect basic profile information necessary for the app\'s functionality, such as your name and profile picture. We also temporarily process the content you provide to the chat and scratchpad to deliver the AI-powered features. This is a mock document for demonstration purposes; no actual data is collected or stored long-term.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="group">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple group-hover:bg-accent-purple group-hover:text-white transition-colors duration-300">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t('privacy.section2Title', '2. How We Use Information')}
                </h2>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border-subtle/50">
                  <p className="text-text-secondary leading-relaxed">
                    {t('privacy.section2Content', 'The information collected is used solely to provide and improve the service. Your name and picture personalize your user experience. The text you input is sent to the Gemini API to generate responses and perform actions like summarizing or proofreading. We do not use your data for advertising or any other purpose.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="group">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-pink/10 text-accent-pink group-hover:bg-accent-pink group-hover:text-white transition-colors duration-300">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t('privacy.section3Title', '3. Data Sharing and Storage')}
                </h2>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border-subtle/50">
                  <p className="text-text-secondary leading-relaxed">
                    {t('privacy.section3Content', 'We do not share your personal information with third parties, except as required to provide the service (e.g., sending prompts to the Google Gemini API). Your chat history and scratchpad content are maintained only for the duration of your session and are not stored permanently on our servers.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="group">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t('privacy.section4Title', '4. Data Security')}
                </h2>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border-subtle/50">
                  <p className="text-text-secondary leading-relaxed">
                    {t('privacy.section4Content', 'We take reasonable measures to protect the information you provide. However, no electronic transmission or storage is 100% secure. We cannot guarantee the absolute security of your data.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <div className="pt-8 border-t border-border-subtle">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {t('privacy.section5Title', '5. Changes to This Policy')}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t('privacy.section5Content', 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.')}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;