"use client";
import React, { useState, useEffect } from 'react';
import { InboxItem } from '@/app/components/Inbox/InboxItem';
import { InboxMessage } from '@/app/models/types';
import inboxService from '@/app/services/inboxService';
import { useTranslation } from 'react-i18next';

export const InboxScreen = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const inboxMessages = await inboxService.getAllMessages();
        setMessages(inboxMessages);
      } catch (error) {
        console.error('Failed to load inbox messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await inboxService.markAsRead(id);
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) {
      console.error('Failed to approve message:', error);
    }
  };

  const handleDeny = async (id: string) => {
    try {
      await inboxService.deleteMessage(id);
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) {
      console.error('Failed to deny message:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-surface text-text-primary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
          <p className="mt-2 text-text-secondary">{t('inbox.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-surface text-text-primary">
        <div className="border-b border-border-subtle p-4">
            <h1 className="text-xl font-bold">{t('inbox.title')}</h1>
        </div>
        <div className="divide-y divide-border-subtle">
            {messages.map(message => (
                <InboxItem 
                    key={message.id} 
                    message={message} 
                    onApprove={handleApprove} 
                    onDeny={handleDeny} 
                />
            ))}
        </div>
        {messages.length === 0 && (
            <div className="text-center py-20">
                <p className="text-text-secondary">{t('inbox.empty')}</p>
            </div>
        )}
    </div>
  );
};
