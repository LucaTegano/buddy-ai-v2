// components/GroupDetail.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Group } from '@/app/models/types';
import { 
    UsersIcon, 
    EllipsisVerticalIcon, 
    PlusCircleIcon, 
    ArrowRightOnRectangleIcon, 
    ChatBubbleLeftRightIcon, 
    DocumentTextIcon, 
    ListBulletIcon 
} from '@/app/components/icons';
import ChatView from './ChatView';
import FilesView from './FilesView';
import TasksView from './TasksView';
// Import the updated generic TabButton component
import TabButton from './TabButton'; 

interface GroupDetailProps {
    group: Group;
    onOpenInvite: () => void;
    onLeaveGroup: () => void;
}

const GroupDetail: React.FC<GroupDetailProps> = ({ group, onOpenInvite, onLeaveGroup }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'chat' | 'files' | 'tasks'>('chat');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex-1 flex flex-col h-full">
            <div className="p-4 border-b border-border-subtle flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold">{group.name}</h2>
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                        <UsersIcon className="w-4 h-4" />
                        <span>{t('groups.members', { count: group.members.length })}</span>
                    </div>
                </div>
                <div className="relative">
                    <button onClick={() => setIsMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-hover dark:hover:bg-surface-hover transition-colors">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>
                     {isMenuOpen && (
                        <div ref={menuRef} className="absolute top-full right-0 mt-2 w-48 bg-secondary rounded-lg shadow-2xl border border-primary  p-2 z-10 animate-in fade-in zoom-in-95 duration-200">
                            <button onClick={() => { onOpenInvite(); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-bg-primary  hover:bg-surface  rounded-md transition-colors">
                                <PlusCircleIcon className="w-5 h-5"/>
                                {t('groups.addMembers')}
                            </button>
                            <button onClick={() => { onLeaveGroup(); setIsMenuOpen(false); }} className="text-feedback-error w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-subtle-2  rounded-md transition-colors">
                                <ArrowRightOnRectangleIcon className="w-5 h-5"/>
                                {t('groups.leaveGroup')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="p-2 border-b border-border-subtle flex items-center gap-2">
                <TabButton 
                    tab="chat" 
                    activeTab={activeTab}
                    onClick={setActiveTab}
                    label={t('groups.chatTab')} 
                    icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />} 
                />
                <TabButton 
                    tab="files"
                    activeTab={activeTab}
                    onClick={setActiveTab} 
                    label={t('groups.filesTab')} 
                    icon={<DocumentTextIcon className="w-5 h-5" />} 
                />
                <TabButton 
                    tab="tasks"
                    activeTab={activeTab}
                    onClick={setActiveTab} 
                    label={t('groups.tasksTab')} 
                    icon={<ListBulletIcon className="w-5 h-5" />} 
                />
            </div>

            {activeTab === 'chat' && <ChatView messages={group.messages} members={group.members} />}
            {activeTab === 'files' && <FilesView files={group.files} />}
            {activeTab === 'tasks' && <TasksView tasks={group.tasks} members={group.members} />}
        </div>
    );
};

export default GroupDetail;