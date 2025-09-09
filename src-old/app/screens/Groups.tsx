"use client"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/app/store/useAppStore';
import { UsersIcon } from '@/app/components/icons';
import { GroupList, GroupDetail } from '@/app/components/Groups';
import CreateGroupModal from '@/app/components/Groups/CreateGroupModal'; // Adjust paths as needed
import GroupInviteModal from '@/app/components/Groups/GroupsInviteModal';
import ConfirmationModal from '@/app/components/modals/ConfirmationModal';

const Groups: React.FC = () => {
    const { t } = useTranslation();
    const { groups, activeGroupId, setActiveGroupId, leaveGroup } = useAppStore();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

    const activeGroup = groups.find(g => g.id === activeGroupId);

    const handleLeaveGroupConfirm = () => {
        if (activeGroupId) {
            leaveGroup(activeGroupId);
        }
        setIsLeaveModalOpen(false);
    };

    return (
        <div className="flex h-full bg-primary">
            <GroupList 
                groups={groups} 
                activeGroupId={activeGroupId} 
                onSelectGroup={setActiveGroupId}
                onCreateNewGroup={() => setIsCreateGroupModalOpen(true)}
            />
            <main className="flex-1 h-full">
                {activeGroup ? (
                    <GroupDetail 
                        group={activeGroup} 
                        onOpenInvite={() => setIsInviteModalOpen(true)}
                        onLeaveGroup={() => setIsLeaveModalOpen(true)}
                    />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-text-secondary p-8">
                        <UsersIcon className="w-16 h-16 mb-4" />
                        <h2 className="text-xl font-semibold text-text-primary">{t('groups.selectGroupTitle')}</h2>
                        <p className="max-w-xs mt-1">{t('groups.selectGroupMessage')}</p>
                    </div>
                )}
            </main>
            
            <CreateGroupModal 
                isOpen={isCreateGroupModalOpen}
                onClose={() => setIsCreateGroupModalOpen(false)}
            />
            {activeGroup && (
                <GroupInviteModal
                    isOpen={isInviteModalOpen}
                    onClose={() => setIsInviteModalOpen(false)}
                    groupName={activeGroup.name}
                    groupId={activeGroup.id}
                />
            )}
            {activeGroup && (
                <ConfirmationModal
                    isOpen={isLeaveModalOpen}
                    onClose={() => setIsLeaveModalOpen(false)}
                    onConfirm={handleLeaveGroupConfirm}
                    title={t('groups.leaveGroupConfirmTitle', { groupName: activeGroup.name })}
                    message={t('groups.leaveGroupConfirmMessage')}
                    confirmText={t('groups.leaveGroupConfirmButton')}
                />
            )}
        </div>
    );
};

export default Groups;