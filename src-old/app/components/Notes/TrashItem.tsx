import React from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTextIcon, ArrowUturnLeftIcon, SolidTrashIcon } from '@/app/components/icons';
import { Note } from '@/app/models/types';

interface TrashItemProps {
    note: Note;
    onRestore: (id: string) => void;
    onDelete: (id: string) => void;
}

const TrashItem: React.FC<TrashItemProps> = ({ note, onRestore, onDelete }) => {
    const { t } = useTranslation();
    
    return (
        <div className="flex items-center justify-between p-4 bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-border-subtle">
            <div className="flex items-center gap-4 truncate">
                <DocumentTextIcon className="w-6 h-6 text-text-disabled flex-shrink-0" />
                <div className="truncate">
                    <p className="text-text-primary font-medium truncate">{note.title}</p>
                    <p className="text-text-secondary text-sm">{t('trash.deletedItem')}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <button 
                    onClick={() => onRestore(note.id)} 
                    className="p-2 rounded-md text-text-secondary hover:bg-hover hover:text-text-primary transition-colors" 
                    title={t('trash.restore')}
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => onDelete(note.id)} 
                    className="p-2 rounded-md text-error hover:bg-error-subtle transition-colors" 
                    title={t('trash.deletePermanently')}
                >
                    <SolidTrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default TrashItem;