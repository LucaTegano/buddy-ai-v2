import React from 'react';
import { useTranslation } from 'react-i18next';
import { Group, GroupMember } from '@/app/models/types'; // Adjust this import path as needed
import { PlusIcon } from '@/app/components/icons'; // Adjust this import path as needed
import AvatarStack from './AvatarStack';


interface GroupListProps {
    groups: Group[];
    activeGroupId: string | null;
    onSelectGroup: (id: string) => void;
    onCreateNewGroup: () => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, activeGroupId, onSelectGroup, onCreateNewGroup }) => {
    const { t } = useTranslation();
    return (
        <div className="w-full md:w-1/3 xl:w-1/4 h-full flex flex-col bg-surface border-r border-border-subtle">
            <div className="p-4 border-b border-border-subtle flex items-center justify-between">
                <h2 className="text-lg font-bold">{t('groups.title')}</h2>
                <button 
                    onClick={onCreateNewGroup} 
                    className="p-2 rounded-lg bg-brand-subtle text-on-brand hover:bg-brand-subtle-2 transition-colors"
                    title={t('groups.createNewGroup')}
                >
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {groups.map(group => (
                    <button
                        key={group.id}
                        onClick={() => onSelectGroup(group.id)}
                        className={`w-full text-left p-4 flex items-center gap-4 transition-colors duration-150 ${activeGroupId === group.id ? 'bg-brand-subtle dark:bg-surface-hover' : 'hover:bg-hover'}`}
                    >
                        <div className="flex-1">
                            <h3 className="font-semibold text-sm">{group.name}</h3>
                            <p className="text-xs text-text-secondary">{group.subject}</p>
                        </div>
                        <AvatarStack members={group.members} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GroupList;