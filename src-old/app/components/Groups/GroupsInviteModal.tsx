import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon, UsersIcon, ClipboardIcon, CheckCircleIcon } from '@/app/components/icons';

interface GroupInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  groupId: string;
}

const GroupInviteModal: React.FC<GroupInviteModalProps> = ({
  isOpen,
  onClose,
  groupName,
  groupId
}) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const inviteLink = `${window.location.origin}/join?group=${groupId}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-xl p-6 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-brand-subtle">
                    <UsersIcon className="h-6 w-6 text-brand-primary" />
                </div>
                <div>
                    <h3 className="text-lg leading-6 font-medium text-text-primary" id="modal-title">
                        {t('groups.inviteModalTitle', { groupName })}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                        {t('groups.inviteModalSubtitle')}
                    </p>
                </div>
            </div>
            <button onClick={onClose} className="-mt-2 -mr-2 p-2 rounded-full hover:bg-hover">
                <XMarkIcon className="w-6 h-6 text-text-secondary" />
            </button>
        </div>

        <div className="mt-6">
            <label htmlFor="invite-link" className="text-sm font-medium text-text-primary">
                {t('groups.inviteLink')}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="invite-link"
                id="invite-link"
                className="block w-full flex-1 rounded-none rounded-l-md border-border-subtle bg-primary px-3 py-2 text-sm focus:border-brand-primary focus:ring-brand-primary"
                value={inviteLink}
                readOnly
              />
              <button
                type="button"
                onClick={handleCopy}
                className="relative inline-flex items-center space-x-2 rounded-r-md border border-l-0 border-border-subtle bg-secondary px-4 py-2 text-sm font-medium text-text-primary hover:bg-hover focus:outline-none focus:ring-1 focus:ring-brand-primary"
              >
                {isCopied ? <CheckCircleIcon className="h-5 w-5 text-feedback-success"/> : <ClipboardIcon className="h-5 w-5" />}
                <span>{isCopied ? t('groups.copied') : t('groups.copyLink')}</span>
              </button>
            </div>
          </div>
        
        <div className="mt-6 text-right">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            onClick={onClose}
          >
            {t('groups.done')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupInviteModal;