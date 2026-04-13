'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { showSuccessToast, showErrorToast, showWarningToast } from '@/lib/utils/toast.utils';

export default function TestToastPage() {
  const { t } = useTranslation();

  const showSuccessToastTranslated = () => {
    showSuccessToast(t('toast.success.default'));
  };

  const showErrorToastTranslated = () => {
    showErrorToast(t('toast.error.default'));
  };

  const showWarningToastTranslated = () => {
    showWarningToast(t('toast.warning.default'));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Toast Notifications</h1>
      <div className="flex gap-4 flex-wrap">
        <Button onClick={showSuccessToastTranslated}>Show Success Toast</Button>
        <Button onClick={showErrorToastTranslated} variant="destructive">Show Error Toast</Button>
        <Button onClick={showWarningToastTranslated} variant="outline">Show Warning Toast</Button>
      </div>
    </div>
  );
}