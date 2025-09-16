// ./src/features/auth/hooks/useLoginForm.ts

"use client";
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth.store';
import { LoginCredentials } from '../types/Auth';

export const useLoginForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { login, error, clearError } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setLoading(true);

    try {
      await login(credentials);
      toast.success(t('login.loginSuccess', 'Logged in successfully! Redirecting...'));
      router.push('/home');
    } catch (err: unknown) { // <-- FIX: 'any' changed to 'unknown'
      // Type-safe error handling
      let errorMessage = t('login.loginError');
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error("Login failed:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    credentials,
    handleInputChange,
    handleLogin,
    t,
  };
};