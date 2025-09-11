"use client";
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'; // Use from 'next/navigation' in App Router
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth.store';
import { LoginCredentials } from '../types/Auth';

export const useLoginForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  
  // <-- CHANGED: We no longer get `isLoading` from the store here
  const { login, error, clearError } = useAuthStore();
  
  // <-- ADDED: A local loading state just for this form
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
    setLoading(true); // <-- Set the LOCAL loading state to true

    try {
      await login(credentials);
      toast.success(t('login.loginSuccess', 'Logged in successfully! Redirecting...'));
      // The middleware will handle redirects, but a push is a good fallback
      router.push('/home'); 
    } catch (err: any) {
      // Error is already set in the store, just catch it here
      console.error("Login failed:", err.message);
      toast.error(err.message || t('login.loginError'));
    } finally {
      setLoading(false); // <-- Set the LOCAL loading state to false
    }
  };

  return {
    loading, // <-- Return the LOCAL loading state
    error,
    credentials,
    handleInputChange,
    handleLogin,
    t,
  };
};