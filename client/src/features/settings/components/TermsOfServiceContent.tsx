"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, UserCheck, ShieldAlert, Scale, CheckCircle } from 'lucide-react';

/**
 * Renders the content for the Terms of Service.
 * This is a pure presentational component designed to be used inside
 * a modal wrapper (like InterceptedModal) or a full-page layout.
 */
const TermsOfServiceContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-surface w-full flex flex-col">
      {/* Header Section */}
      <header className="px-8 py-16 text-center bg-gradient-to-b from-accent-blue/10 to-surface border-b border-border-subtle">
        <div className="inline-flex items-center justify-center p-3 bg-accent-blue/10 rounded-2xl mb-6 shadow-sm">
          <FileText className="w-8 h-8 text-accent-blue" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
          {t('tos.title', 'Terms of Service')}
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          {t('tos.subtitle', 'Please read these terms carefully before using Study Buddy AI.')}
        </p>
        <div className="mt-8 inline-block px-4 py-1.5 bg-secondary/50 rounded-full text-sm font-medium text-text-secondary border border-border-subtle">
          {t('tos.date', 'Effective Date: July 24, 2024')}
        </div>
      </header>

      {/* Content Area */}
      <div className="px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <section className="group">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t('tos.section1Title', '1. Introduction')}
                </h2>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border-subtle/50">
                  <p className="text-text-secondary leading-relaxed">
                    {t('tos.section1Content', 'Welcome to Study Buddy AI ("we," "our," "us"). These Terms of Service ("Terms") govern your use of our application and services. By accessing or using our service, you agree to be bound by these Terms. This is a mock document for demonstration purposes and holds no legal weight.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="group">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple group-hover:bg-accent-purple group-hover:text-white transition-colors duration-300">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t('tos.section2Title', '2. Use of Service')}
                </h2>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border-subtle/50">
                  <p className="text-text-secondary leading-relaxed">
                    {t('tos.section2Content', 'Study Buddy AI is provided for educational and personal use only. You agree not to use the service for any illegal or unauthorized purpose. You are responsible for any content you provide and your interactions with the AI. We reserve the right to suspend or terminate your access to the service at any time, without notice, for conduct that we believe violates these Terms.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="group">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-pink/10 text-accent-pink group-hover:bg-accent-pink group-hover:text-white transition-colors duration-300">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t('tos.section3Title', '3. User Content')}
                </h2>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border-subtle/50">
                  <p className="text-text-secondary leading-relaxed">
                    {t('tos.section3Content', 'You retain ownership of the notes and content you create ("User Content"). By using the service, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your User Content solely for the purpose of operating and providing the service to you. We do not claim any ownership rights over your data.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="group">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-orange/10 text-accent-orange group-hover:bg-accent-orange group-hover:text-white transition-colors duration-300">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t('tos.section4Title', '4. Disclaimers')}
                </h2>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border-subtle/50">
                  <p className="text-text-secondary leading-relaxed">
                    {t('tos.section4Content', 'The service is provided on an "as is" and "as available" basis. While we strive to provide accurate and helpful information, the AI-generated content may contain errors or inaccuracies. We do not warrant that the service will be uninterrupted, error-free, or secure. You should not rely on the AI for critical advice and should always verify important information.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="group">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t('tos.section5Title', '5. Limitation of Liability')}
                </h2>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border-subtle/50">
                  <p className="text-text-secondary leading-relaxed">
                    {t('tos.section5Content', 'To the fullest extent permitted by law, Study Buddy AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.')}
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceContent;