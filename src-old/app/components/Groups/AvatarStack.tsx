import React from 'react';
import { GroupMember } from '@/app/models/types';

interface AvatarStackProps {
    members: GroupMember[];
}

const AvatarStack: React.FC<AvatarStackProps> = ({ members }) => (
    <div className="flex -space-x-2">
        {members.slice(0, 3).map((member) => (
            <img key={member.id} src={member.picture} alt={member.name} title={member.name} className="w-6 h-6 rounded-full border-2 border-surface dark:border-border-subtle" />
        ))}
        {members.length > 3 && (
            <div className="flex items-center justify-center w-6 h-6 text-xs font-semibold text-brand-dark bg-brand-subtle rounded-full border-2 border-surface dark:border-border-subtle dark:bg-brand-dark/50 dark:text-brand-light">
                +{members.length - 3}
            </div>
        )}
    </div>
);

export default AvatarStack;