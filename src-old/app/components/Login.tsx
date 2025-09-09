"use client"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SparklesIcon } from './icons';
import ThemeToggleButton from './ThemeToggleButton';
import { useAppStore } from '../store/useAppStore';
import authService from '../services/authService';
import SignupForm from './SignupForm';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login: appLogin, openTos, openPrivacyPolicy, theme, toggleTheme } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Use real authentication service
      const response = await authService.login({
        email: credentials.email,
        password: credentials.password
      });
      
      console.log('Login response:', response);
      
      // Check if login was successful
      if (!response.success) {
        throw new Error(t('login.loginError'));
      }
      
      await appLogin();
    } catch (err: any) {
      console.error('Login error:', err);
      // Provide more specific error messages based on the error type
      if (err.status === 0) {
        setError(t('login.networkError'));
      } else if (err.status === 403) {
        setError(t('login.accessForbidden'));
      } else {
        setError(err.message || t('login.loginError'));
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-primary p-4">
      <ThemeToggleButton theme={theme} onToggle={toggleTheme} className="absolute top-4 right-4" />
      <div className="w-full max-w-md mx-auto">
        <header className="flex items-center justify-center mb-8">
          <SparklesIcon className="w-10 h-10 text-brand-primary mr-3"/>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">
            {t('login.title')}
          </h1>
        </header>
        <div className="bg-surface p-8 rounded-2xl shadow-lg shadow-border-subtle/50 dark:shadow-overlay/20">
          <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
            {isLoginMode ? t('login.welcome') : t('login.createAccount')}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-error-subtle text-error rounded-md text-sm">
              {error}
            </div>
          )}
          
          {isLoginMode ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                  {t('login.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary bg-primary text-text-primary"
                  placeholder={t('login.emailPlaceholder')}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
                  {t('login.password')}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary bg-primary text-text-primary"
                  placeholder={t('login.passwordPlaceholder')}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-brand-primary rounded-lg hover:bg-brand-hover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('login.signingIn')}
                  </>
                ) : (
                  t('login.signIn')
                )}
              </button>
              
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsLoginMode(false)}
                  className="text-sm font-medium text-brand-primary hover:text-brand-hover focus:outline-none"
                >
                  {t('login.noAccount')}
                </button>
              </div>
            </form>
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLoginMode(true)} />
          )}
        </div>
        <p className="text-xs text-text-secondary mt-6 text-center">
          {t('login.tosAgreement')}{' '}
          <button 
              onClick={openTos}
              className="font-medium text-brand-primary hover:text-brand-hover underline focus:outline-none"
          >
              {t('login.tosLink')}
          </button>
          {' '}{t('login.and')}{' '}
          <button
            onClick={openPrivacyPolicy}
            className="font-medium text-brand-primary hover:text-brand-hover underline focus:outline-none"
          >
            {t('login.privacyLink')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;