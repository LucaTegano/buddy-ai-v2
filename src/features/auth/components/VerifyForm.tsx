'use client';

import React, { useState, useEffect } from 'react';
// <-- 1. Importa il router da next/navigation
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import AuthButton from './AuthButton';
import authService from '../services/auth.service';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const VerifyForm = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  // <-- 2. Inizializza il router
  const router = useRouter(); 
  
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setEmail(searchParams.get('email'));
  }, [searchParams]);

  const extractDigits = (input: string): string => {
    return input.replace(/\D/g, '');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    const cleanCode = extractDigits(code);

    if (cleanCode.length !== 6) {
      setError(t('verification.codeLengthError', 'Il codice di verifica deve essere di 6 cifre.'));
      setLoading(false);
      return;
    }

    try {
      await authService.verify({ email, verificationCode: cleanCode });
      toast.success(t('verification.success', 'Il tuo account è stato verificato con successo!'));

      // <-- 3. Esegui il redirect dopo un breve ritardo
      // Aggiungiamo un ritardo in modo che l'utente possa vedere il messaggio di successo.
      setTimeout(() => {
        router.push('/home');
      }, 1500); // Ritardo di 1.5 secondi

    } catch (err: unknown) {
      console.error('Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('404') || errorMessage.includes('not found')) {
        const errorMsg = t('verification.codeNotFound', 'Codice di verifica non trovato. Controlla il codice e riprova.');
        setError(errorMsg);
        toast.error(errorMsg);
      } else if (errorMessage.includes('expired')) {
        const errorMsg = t('verification.codeExpired', 'Il codice di verifica è scaduto. Richiedine uno nuovo.');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = t('verification.error', 'Si è verificato un errore imprevisto.');
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
    setLoading(false);
  };

  // ... (il resto del codice rimane invariato)
  
  const handleResend = async () => {
    if (!email) return;
    
    setLoading(true);
    setError(null);
    setCode('');

    try {
      await authService.resendVerification(email);
      toast.success(t('verification.codeResent', 'Un nuovo codice di verifica è stato inviato alla tua email.'));
    } catch (err: unknown) {
      console.error('Resend error:', err);
      const errorMsg = t('verification.resendError', 'Impossibile inviare nuovamente il codice. Riprova più tardi.');
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  if (email === null) {
    return (
      <div className="max-w-md w-full mx-auto text-center p-4">
        {email === undefined ? (
           <div className="p-4 bg-error-subtle text-error rounded-md">
             <h2 className="text-xl font-bold mb-2">{t('verification.error')}</h2>
             <p>{t('verification.missingEmail')}</p>
           </div>
        ) : (
          <p>{t('loading', 'Caricamento...')}</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary">{t('verification.title')}</h2>
        <p className="text-text-secondary mt-2">
          {t('verification.description', { email })}
        </p>
      </div>
      
      <form onSubmit={handleVerify}>
        <div className="flex justify-center mb-6">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(newCode) => setCode(newCode)}
            autoComplete="one-time-code"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        {error && (
          <div className="my-4 p-3 bg-error-subtle text-error rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <div className="mt-6">
          <AuthButton 
            type="submit" 
            isLoading={loading} 
            loadingText={t('verification.verifying', 'Verifica in corso...')}
          >
            {t('verification.verify', 'Verifica Account')}
          </AuthButton>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-text-secondary">{t('verification.didNotReceive')}</span>
        <button 
          onClick={handleResend} 
          disabled={loading}
          className="ml-1 font-medium text-brand-primary hover:text-brand-hover hover:underline disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
        >
          {t('verification.resend')}
        </button>
      </div>
    </div>
  );
};

export default VerifyForm;