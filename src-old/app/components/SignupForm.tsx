"use client"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import authService from '../services/authService';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const { t } = useTranslation();
  const { login: appLogin } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(t('login.passwordsDoNotMatch'));
      setLoading(false);
      return;
    }
    
    try {
      // Try to signup with the provided credentials
      const signupResponse = await authService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Signup response:', signupResponse);
      
      // Check if signup was successful
      if (!signupResponse.success) {
        throw new Error(signupResponse.message || t('login.signupError'));
      }
      
      // After successful signup, automatically login
      const loginResponse = await authService.login({
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login response:', loginResponse);
      
      // Check if login was successful
      if (!loginResponse.success) {
        throw new Error(t('login.loginError'));
      }
      
      // Update app state
      await appLogin();
    } catch (err: any) {
      console.error('Signup error:', err);
      // Provide more specific error messages based on the error type
      if (err.status === 0) {
        setError(t('login.networkError'));
      } else if (err.status === 403) {
        setError(t('login.accessForbidden'));
      } else {
        setError(err.message || t('login.signupError'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
          {t('login.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary bg-primary text-text-primary"
          placeholder={t('login.namePlaceholder')}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="signup-email" className="block text-sm font-medium text-text-primary mb-1">
          {t('login.email')}
        </label>
        <input
          type="email"
          id="signup-email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary bg-primary text-text-primary"
          placeholder={t('login.emailPlaceholder')}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="signup-password" className="block text-sm font-medium text-text-primary mb-1">
          {t('login.password')}
        </label>
        <input
          type="password"
          id="signup-password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary bg-primary text-text-primary"
          placeholder={t('login.passwordPlaceholder')}
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-1">
          {t('login.confirmPassword')}
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary bg-primary text-text-primary"
          placeholder={t('login.confirmPasswordPlaceholder')}
          required
        />
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-error-subtle text-error rounded-md text-sm">
          {error}
        </div>
      )}
      
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
            {t('login.signingUp')}
          </>
        ) : (
          t('login.signUp')
        )}
      </button>
      
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm font-medium text-brand-primary hover:text-brand-hover focus:outline-none"
        >
          {t('login.alreadyHaveAccount')}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;