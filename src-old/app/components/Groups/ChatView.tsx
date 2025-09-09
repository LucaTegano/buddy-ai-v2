import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/app/store/useAppStore';
import { GroupMessage, GroupMember } from '@/app/models/types';
import { PaperClipIcon, SendIcon } from '@/app/components/icons';

interface ChatViewProps {
    messages: GroupMessage[];
    members: GroupMember[];
}

// Helper component for the message bubble "tail"
const MessageTail: React.FC<{ isCurrentUser: boolean }> = ({ isCurrentUser }) => {
    const tailClass = isCurrentUser
        ? "absolute right-0 top-0 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-brand-subtle-2"
        : "absolute left-0 top-0 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-brand-subtle-3";
    
    // Using clip-path to create the triangle/tail shape
    const clipPathStyle = isCurrentUser
        ? { clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }
        : { clipPath: 'polygon(0 0, 0 100%, 100% 0)' };
    
    return <div className={tailClass} style={clipPathStyle} />;
};

const ChatView: React.FC<ChatViewProps> = ({ messages, members }) => {
    const { t } = useTranslation();
    const { user } = useAppStore();
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getSender = (senderId: string) => members.find(m => m.id === senderId);

    return (
        <div className="flex-1 flex flex-col p-4">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                {messages.map(msg => {
                    const sender = getSender(msg.senderId);
                    const isCurrentUser = sender?.id === user?.id;

                    return (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                            {!isCurrentUser && sender && (
                                <img src={sender.picture} alt={sender.name} className="w-8 h-8 rounded-full" />
                            )}
                            <div
                                className={`relative max-w-lg px-3 pt-2 pb-1.5 rounded-lg ${
                                    isCurrentUser
                                        ? 'bg-brand-subtle-2 text-white rounded-br-none'
                                        : 'bg-brand-subtle-3 rounded-bl-none'
                                }`}
                            >
                                {/* This adds the WhatsApp-style tail to the bubble */}
                                {/* The logic is commented out because simple rounded corners look cleaner with this design.
                                    Enable it if you want the explicit tail. For a cleaner look, the adjusted rounded corners (br/bl-none) suffice.
                                <MessageTail isCurrentUser={isCurrentUser} /> 
                                */}
                                
                                {!isCurrentUser && sender && (
                                    <p className="font-semibold text-xs mb-1 text-brand-primary">{sender.name}</p>
                                )}
                                
                                <div className="flex items-end gap-2">
                                    {/* Using whitespace-pre-wrap to respect newlines in messages */}
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    
                                    {/* Timestamp positioned at the bottom-right */}
                                    <p className={`text-xs whitespace-nowrap pt-1 ${isCurrentUser ? 'text-text-primary/75' : 'text-text-secondary'}`}>
                                        {msg.timestamp}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="mt-4 flex items-center gap-3">
                {/* Pill-shaped container for input and attach button */}
                <div className="flex-1 flex items-center bg-hover dark:bg-surface-hover rounded-full px-2">
                    <button className="p-2.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <PaperClipIcon className="w-5 h-5 text-text-secondary" />
                    </button>
                    <input
                        type="text"
                        placeholder={t('groups.chatPlaceholder')}
                        className="w-full px-2 py-2.5 text-sm bg-transparent border-none focus:ring-0"
                    />
                </div>
                
                {/* Circular Send Button */}
                <button className="p-3 rounded-full bg-brand-primary text-on-brand hover:bg-brand-hover transition-colors flex-shrink-0">
                    <SendIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ChatView;