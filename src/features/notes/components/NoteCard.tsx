"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { noteActions } from '../actions/note.actions';
import { DocumentTextIcon, UsersIcon } from '@/shared/components/icons';
import Link from 'next/link';

interface NoteCardProps {
    note: any;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    const { t } = useTranslation();

    // Use the formatted date from backend or fallback to formatting updatedAt
    const displayDate = () => {
        if (note.formattedDate) {
            return note.formattedDate;
        }
        
        return "Now";
    };

    return (
        <Link
            href={`/note/${note.id}`}
            className="flex-shrink-0 w-64 snap-start bg-surface p-5 rounded-xl border border-border-subtle shadow-lg shadow-subtle cursor-pointer group hover:border-brand-primary hover:-translate-y-1 transition-all duration-200 block"
        >
            <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-brand-subtle rounded-lg">
                    <DocumentTextIcon className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="flex-1 font-bold text-text-primary truncate group-hover:text-brand-primary transition-colors">{note.title}</h3>
            </div>
            <div className="text-xs text-text-secondary space-y-2">
                <p>{t('noteCard.lastEdited')} <span className="font-medium text-text-primary">{displayDate()}</span></p>
                {note.participantCount > 1 && (
                    <div className="flex items-center gap-1.5">
                        <UsersIcon className="w-4 h-4" />
                        <span>{t('noteCard.participants', { count: note.participantCount })}</span>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default NoteCard;