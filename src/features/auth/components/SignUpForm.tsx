  "use client";

  import React from 'react';
  import Link from 'next/link'; // Import the Link component
  import { useSignupForm } from '../hooks/useSignUpForm';
  import AuthButton from './AuthButton';
  import AuthInput from './AuthInput'; // Import our new component

  const SignupForm = () => {
    const { formData, loading, error, handleInputChange, handleSubmit, t } = useSignupForm();

    return (
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="username"
          label={t('login.username')}
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          placeholder={t('login.namePlaceholder')}
          required
          autoComplete="username"
        />

        <AuthInput
          id="signup-email"
          label={t('login.email')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder={t('login.emailPlaceholder')}
          required
          autoComplete="email"
        />

        <AuthInput
          id="signup-password"
          label={t('login.password')}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
          required
          autoComplete="new-password"
        />
        
        <AuthInput
          id="confirmPassword"
          label={t('login.confirmPassword')}
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="••••••••"
          required
          autoComplete="new-password"
        />

        {error && (
          <div className="mb-4 p-3 bg-error-subtle text-error rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Add some top margin to separate the button from the last field */}
        <div className="mt-6">
          <AuthButton type="submit" isLoading={loading} loadingText={t('login.signingUp')}>
            {t('login.signUp')}
          </AuthButton>
        </div>
        
        {/* CORRECTED: Use Link for navigation */}
        <div className="mt-6 text-center text-sm">
          <span className="text-text-secondary">{t('login.alreadyHaveAccount')}</span>
          <Link 
            href="/login" 
            className="font-medium text-brand-primary hover:text-brand-hover hover:underline focus:outline-none"
          >
            Log in
          </Link>
        </div>
      </form>
    );
  };

  export default SignupForm;