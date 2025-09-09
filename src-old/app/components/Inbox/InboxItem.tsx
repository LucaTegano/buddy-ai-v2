import React from 'react';
import { InboxMessage } from '@/app/models/types';
import { Button } from '@/app/components/shared';
import { UserCircleIcon, SparklesIcon, CheckCircleIcon, XCircleIcon } from '@/app/components/icons';
import { useTranslation } from 'react-i18next';

interface InboxItemProps {
  message: InboxMessage;
  onApprove?: (id: string) => void;
  onDeny?: (id: string) => void;
}

const GroupInvitationContent: React.FC<{ message: any, onApprove: any, onDeny: any }> = ({ message, onApprove, onDeny }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <img src={message.from.picture} alt={message.from.name} className="w-10 h-10 rounded-full mr-4" />
            <div className="flex-grow">
                <p className="text-sm text-text-primary">
                    <span className="font-semibold">{message.from.name}</span> {t('inbox.groupInvitation')} <span className="font-semibold">{message.group.name}</span>.
                </p>
                <p className="text-xs text-text-secondary mt-1">{new Date(message.timestamp).toLocaleString()}</p>
            </div>
            <div className="flex gap-2 mt-3 sm:mt-0 sm:ml-4">
                <Button 
                    onClick={() => onApprove(message.id)} 
                    size="lg" 
                    className="bg-feedback-success hover:bg-feedback-success-hover text-white"
                >
                    <CheckCircleIcon className="w-6 h-6 mr-2"/>
                    {t('inbox.approve')}
                </Button>

                
                <Button 
                    onClick={() => onDeny(message.id)} 
                    size="lg" 
                    className="bg-feedback-error-bg-subtle text-feedback-error-text hover:bg-feedback-error-bg-subtle-hover"
                >
                    <XCircleIcon className="w-6 h-6 mr-2"/>
                    {t('inbox.deny')}
                </Button>
            </div>
        </div>
    );
};

const SystemNotificationContent: React.FC<{ message: any }> = ({ message }) => (
    <div className="flex items-center">
        {/* Uses theme-aware secondary text color for the icon */}
        <UserCircleIcon className="w-8 h-8 mr-4 text-text-secondary" />
        <div className="flex-grow">
            <p className="text-sm text-text-primary">{message.message}</p>
            <p className="text-xs text-text-secondary mt-1">{new Date(message.timestamp).toLocaleString()}</p>
        </div>
    </div>
);

const NewFeatureContent: React.FC<{ message: any }> = ({ message }) => (
    <div className="flex items-center">
        {/* Uses theme-aware brand color for the icon */}
        <SparklesIcon className="w-8 h-8 mr-4 text-brand-primary" />
        <div className="flex-grow">
            <p className="font-semibold text-text-primary">{message.title}</p>
            <p className="text-sm text-text-primary">{message.message}</p>
            <p className="text-xs text-text-secondary mt-1">{new Date(message.timestamp).toLocaleString()}</p>
        </div>
    </div>
);

export const InboxItem: React.FC<InboxItemProps> = ({ message, onApprove, onDeny }) => {
  const renderContent = () => {
    switch (message.type) {
      case 'group-invitation':
        return <GroupInvitationContent message={message} onApprove={onApprove} onDeny={onDeny} />;
      case 'system-notification':
        return <SystemNotificationContent message={message} />;
      case 'new-feature':
        return <NewFeatureContent message={message} />;
      default:
        return null;
    }
  };

  return (
    // --- MODIFIED: Uses the new semantic background for unread items ---
    <div className={`p-4 border-b border-border-subtle ${!message.read ? 'bg-bg-accent-unread' : 'bg-bg-surface'}`}>
      {renderContent()}
    </div>
  );
};