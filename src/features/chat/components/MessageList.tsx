// src/features/chat/components/MessageList.tsx
import React from 'react';
import { ChatMessage,  } from '@/features/chat/types/AiChat';
import { UserMessage } from './UserMessage';
import { ModelMessage } from './ModelMessage';

enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}
interface MessageListProps {
  messages: ChatMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <>
    {messages.map((msg, index) =>
      msg.role === MessageRole.USER ? (
        <UserMessage key={index} text={msg.text} />
      ) : (
        <ModelMessage key={index} text={msg.text} />
      )
    )}
  </>
);