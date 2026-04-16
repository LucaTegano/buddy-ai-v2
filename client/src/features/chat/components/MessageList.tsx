// src/features/chat/components/MessageList.tsx
import { ChatMessage, MessageRole } from '@/features/chat/types/AiChat';
import { UserMessage } from './UserMessage';
import { ModelMessage } from './ModelMessage';

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