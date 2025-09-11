// hooks/useSignupForm.ts

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth.store';
import authService from '../services/auth.service';

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
    } catch (err: any) {
      const backendMessage = err.response?.data?.message || err.response?.data?.error || t('login.errorSendingVerification');
      setFormError(backendMessage);
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- REPLACE YOUR handleSubmit WITH THIS ONE ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('1. Form submission initiated.');

    setLoading(true);
    setFormError(null);
    clearError();

    if (formData.password !== formData.confirmPassword) {
      setFormError(t('login.passwordsDoNotMatch'));
      setLoading(false);
      return;
    }

    try {
      console.log('2. Calling authService.signup with:', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      await authService.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      toast.success(t('login.signupSuccess', 'Signed up successfully! Redirecting...'));

      // If you see this log, the API call was successful.
      console.log('3. Signup API call SUCCESSFUL. Redirecting now...');
      router.push(`/verify?email=${formData.email}`);

    } catch (err: any) {
      // THIS IS THE MOST IMPORTANT PART FOR DEBUGGING
      console.error('4. SIGNUP FAILED! The API returned an error:', err);

      // Axios errors have a `response` object. Let's inspect it.
      if (err.response) {
        console.error('--- Backend Response Details ---');
        console.error('Status Code:', err.response.status);
        console.error('Response Data:', err.response.data);
        console.error('--------------------------------');

        // Display a more specific error from the backend if available
        const backendMessage = err.response.data?.message || err.response.data?.error || 'An unknown API error occurred.';
        setFormError(backendMessage);
        toast.error(backendMessage);
      } else {
        // For generic network errors (e.g., backend is down)
        setFormError(err.message || t('login.signupError'));
        toast.error(err.message || t('login.signupError'));
      }
    } finally {
      setLoading(false);
      console.log('5. handleSubmit function finished.');
    }
  };
  // --- END OF REPLACEMENT ---

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