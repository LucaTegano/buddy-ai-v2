import React from 'react';

interface UserMessageProps {
  text: string;
}

export const UserMessage: React.FC<UserMessageProps> = ({ text }) => (
  <div className="flex justify-end my-4">
    <div className="max-w-2xl px-4 py-2.5 rounded-xl bg-brand-primary text-on-brand shadow">
      <p className="text-sm break-words whitespace-pre-wrap leading-relaxed">{text}</p>
    </div>
  </div>
);