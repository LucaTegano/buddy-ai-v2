import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExclamationTriangleIcon } from '@/app/components/icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm"
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-primary rounded-lg shadow-xl p-6 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-error-subtle sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon className="h-6 w-6 text-error" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-text-primary" id="modal-title">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-text-secondary">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
      <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border-2 border-feedback-error shadow-sm px-4 py-2 bg-feedback-error text-base font-medium text-text-primary hover:opacity-70 focus:outline-none sm:w-auto sm:text-sm cursor-pointer"
          onClick={onConfirm}
      >
          {confirmText}
      </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-border-subtle shadow-sm px-4 py-2 bg-surface text-base font-medium text-text-primary hover:bg-hover focus:outline-none sm:mt-0 sm:w-auto sm:text-sm cursor-pointer"
            onClick={onClose}
          >
            {t('modal.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;