"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useLoginForm } from '../hooks/useLoginForm';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';

const LoginForm = () => {
  const router = useRouter();
  const { isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();
  const { loading, error, credentials, handleInputChange, handleLogin, t } = useLoginForm();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Check auth status on component mount
  useEffect(() => {
    const checkAuthentication = () => {
      checkAuth();
      setInitialCheckDone(true);
    };
    
    checkAuthentication();
  }, [checkAuth]);

  // Redirect to home if already authenticated
  useEffect(() => {
    if (initialCheckDone && isAuthenticated) {
      router.push('/home');
    }
  }, [initialCheckDone, isAuthenticated, router]);

  // Don't render the form while checking auth status or if user is authenticated
  if (isCheckingAuth || !initialCheckDone || isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleLogin}>
      {error && (
        <div className="mb-4 p-3 bg-error-subtle text-error rounded-md text-sm">
          {error}
        </div>
      )}

      <AuthInput
        id="username"
        label={t('login.username')}
        name="username"
        type="text"
        value={credentials.username}
        onChange={handleInputChange}
        placeholder={t('login.namePlaceholder')}
        required
        autoComplete="username"
      />

      <AuthInput
        id="password"
        label={t('login.password')}
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleInputChange}
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />

      <div className="mt-6">
        <AuthButton type="submit" isLoading={loading} loadingText={t('login.signingIn')}>
          {t('login.signIn')}
        </AuthButton>
      </div>

      <div className="mt-6 text-center text-sm">
        <span className="text-text-secondary">{t('login.noAccount')}</span>
        <Link 
          href="/sign-up" 
          className="font-medium text-brand-primary hover:text-brand-hover hover:underline focus:outline-none"
        >
          {t('login.signUp')}
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;