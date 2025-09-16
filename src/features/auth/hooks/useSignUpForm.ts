// ./src/features/auth/hooks/useSignUpForm.ts

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth.store';
import authService from '../services/auth.service';

// Helper type for Axios-like errors to make assertions cleaner
type ApiError = {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
  message: string;
};

export const useSignupForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { error: authError, clearError } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResendVerification = async () => {
    if (!formData.email) {
      setFormError(t('login.emailRequiredForVerification'));
      return;
    }
    setLoading(true);
    setFormError(null);
    clearError();

    try {
      await authService.resendVerification(formData.email);
      toast.success(t('login.verificationEmailSent'));
      router.push(`/verify?email=${formData.email}`);
    } catch (err: unknown) { // <-- FIX 1: 'any' changed to 'unknown'
      const error = err as ApiError; // Assert error shape
      const backendMessage = error.response?.data?.message || error.response?.data?.error || t('login.errorSendingVerification');
      setFormError(backendMessage);
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    clearError();

    if (formData.password !== formData.confirmPassword) {
      setFormError(t('login.passwordsDoNotMatch'));
      setLoading(false);
      return;
    }

    try {
      await authService.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      toast.success(t('login.signupSuccess', 'Signed up successfully! Redirecting...'));
      router.push(`/verify?email=${formData.email}`);
    } catch (err: unknown) { // <-- FIX 2: 'any' changed to 'unknown'
      const error = err as ApiError; // Assert error shape
      console.error('SIGNUP FAILED! The API returned an error:', error);
      
      const backendMessage = error.response?.data?.message || error.response?.data?.error || error.message || t('login.signupError');
      setFormError(backendMessage);
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  const displayError = formError || authError;

  return {
    formData,
    loading,
    error: displayError,
    handleInputChange,
    handleSubmit,
    handleResendVerification,
    t
  };
};