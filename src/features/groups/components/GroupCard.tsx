import React from 'react';
import { useTranslation } from 'react-i18next';
import { Group } from '@/features/groups/types/Group';
import { groupActions } from '@/features/groups/actions/group.actions';
import { UsersIcon } from '@/shared/components/icons';

interface GroupCardProps {
    group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    const { t } = useTranslation();

    const handleViewGroup = () => {
        groupActions.setActiveGroupId(group.id);
    };

    // Get member count
    const memberCount = group.members?.length || 0;

    return (
        <div 
            className="flex-shrink-0 w-64 snap-start bg-surface p-5 rounded-xl border border-border-subtle shadow-lg shadow-subtle cursor-pointer group hover:border-brand-primary hover:-translate-y-1 transition-all duration-200 block"
            onClick={handleViewGroup}
        >
            <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-brand-subtle rounded-lg">
                    <UsersIcon className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="flex-1 font-bold text-text-primary truncate group-hover:text-brand-primary transition-colors">
                    {group.name}
                </h3>
            </div>
            <div className="text-xs text-text-secondary space-y-2">
                <div className="flex items-center gap-1.5">
                    <UsersIcon className="w-4 h-4" />
                    <span>{t('groupCard.members', { count: memberCount })}</span>
                </div>
            </div>
        </div>
    );
};

export default GroupCard;