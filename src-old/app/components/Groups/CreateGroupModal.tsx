import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/app//store/useAppStore';
import { XMarkIcon, UsersIcon } from '@/app/components/icons';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { addGroup } = useAppStore();
  const [groupName, setGroupName] = useState('');
  const [subject, setSubject] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && subject.trim()) {
      addGroup(groupName.trim(), subject.trim());
      onClose();
      setGroupName('');
      setSubject('');
    }
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
                {t('groups.createGroupModalTitle')}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {t('groups.createGroupModalSubtitle')}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="-mt-2 -mr-2 p-2 rounded-full hover:bg-hover">
            <XMarkIcon className="w-6 h-6 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="group-name" className="block text-sm font-medium text-text-primary">
              {t('groups.groupNameLabel')}
            </label>
            <input
              type="text"
              id="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder={t('groups.groupNamePlaceholder')}
              className="mt-1 block w-full rounded-md border-border-subtle bg-primary px-3 py-2 text-sm focus:border-brand-primary focus:ring-brand-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-text-primary">
              {t('groups.subjectLabel')}
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t('groups.subjectPlaceholder')}
              className="mt-1 block w-full rounded-md border-border-subtle bg-primary px-3 py-2 text-sm focus:border-brand-primary focus:ring-brand-primary"
              required
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-border-subtle shadow-sm px-4 py-2 bg-surface text-sm font-medium text-text-primary hover:bg-hover focus:outline-none"
              onClick={onClose}
            >
              {t('modal.cancel')}
            </button>
            <button
              type="submit"
              disabled={!groupName.trim() || !subject.trim()}
              className="inline-flex justify-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-hover focus:outline-none disabled:bg-text-disabled"
            >
              {t('groups.createButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;