"use client"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import ConfirmationModal from '@/app/components/modals/ConfirmationModal';
import { TrashItem, EmptyTrash } from '@/app/components/Notes';



const TrashView: React.FC = () => {
    const { t } = useTranslation();
    const { trash, restoreNoteFromTrash, deleteNotePermanently, emptyTrash } = useAppStore();
    const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
    const [showEmptyTrashModal, setShowEmptyTrashModal] = useState(false);

    const handlePermanentDelete = () => {
        if(noteToDelete) {
            deleteNotePermanently(noteToDelete);
            setNoteToDelete(null);
        }
    }

    const handleEmptyTrash = () => {
        emptyTrash();
        setShowEmptyTrashModal(false);
    }

    return (
        <div className="h-full flex flex-col bg-primary">
            <header className="flex items-center justify-between p-4 border-b border-border-subtle bg-surface flex-shrink-0 h-[73px]">
                <h1 className="text-xl font-bold text-text-primary">{t('trash.title')}</h1>
                {trash.length > 0 && (
                    <button
                        onClick={() => setShowEmptyTrashModal(true)}
                        className="px-4 py-2 text-sm font-semibold text-error bg-error-subtle rounded-md hover:bg-error-hover transition-colors"
                    >
                        {t('trash.empty')}
                    </button>
                )}
            </header>

            <main className="flex-1 overflow-y-auto p-6">
                {trash.length === 0 ? (
                    <EmptyTrash />
                ) : (
                    <div className="space-y-4 max-w-4xl mx-auto">
                        <p className="text-sm text-text-secondary mb-4">{t('trash.itemsWarning')}</p>
                        {trash.map(note => (
                            <TrashItem 
                                key={note.id} 
                                note={note} 
                                onRestore={restoreNoteFromTrash} 
                                onDelete={(id) => setNoteToDelete(id)}
                            />
                        ))}
                    </div>
                )}
            </main>
            
            <ConfirmationModal 
                isOpen={!!noteToDelete}
                onClose={() => setNoteToDelete(null)}
                onConfirm={handlePermanentDelete}
                title={t('trash.deleteModalTitle')}
                message={t('trash.deleteModalMessage')}
                confirmText={t('trash.deleteModalConfirm')}
            />
             <ConfirmationModal 
                isOpen={showEmptyTrashModal}
                onClose={() => setShowEmptyTrashModal(false)}
                onConfirm={handleEmptyTrash}
                title={t('trash.emptyModalTitle')}
                message={t('trash.emptyModalMessage', { count: trash.length })}
                confirmText={t('trash.emptyModalConfirm')}
            />
        </div>
    )
}

export default TrashView;