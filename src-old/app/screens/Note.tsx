import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import Carousel from '@/app/components/shared/Carousel';
import NoteCard from '@/app/components/shared/NoteCard';
import ProjectCard from '@/app/components/ProjectCard';
import TaskList from '@/app/components/TaskList';
import { EmptyNotes, EmptyProjects } from '@/app/components/Home';
import { PlusIcon } from '@/app/components/icons';
import { useRouter } from 'next/navigation';

const Note: React.FC = () => {
    const { t } = useTranslation();
    const { user, notes, projects, groups, personalTasks } = useAppStore();
    const router = useRouter();

    if (!user) return null;



    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-16">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-text-primary">{t('sidebar.notes')}</h1>
                <button 
                    onClick={() => router.push('/note/new')}
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-brand-subtle-2 text-white hover:bg-brand-subtle-2/60 transition-colors duration-200 shadow-sm">
                    <PlusIcon className="w-6 h-6" />
                    <span className="ml-2 font-semibold">{t('sidebar.newNote')}</span>
                </button>
            </div>
            <section className="mb-10">
                {notes.length > 0 ? (
                    <Carousel title={t('home.recentNotes')}>
                        {notes.map(note => <NoteCard key={note.id} note={note} />)}
                    </Carousel>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-text-primary mb-4">{t('home.recentNotes')}</h2>
                        <EmptyNotes />
                    </>
                )}
            </section>

            <section className="mb-10">
                 {projects.length > 0 ? (
                    <Carousel title={t('home.collaborativeProjects')}>
                        {projects.map(project => <ProjectCard key={project.id} project={project} />)}
                    </Carousel>
                 ) : (
                    <>
                        <h2 className="text-xl font-bold text-text-primary mb-4">{t('home.collaborativeProjects')}</h2>
                        <EmptyProjects />
                    </>
                 )}
            </section>
        </div>
    );
};

export default Note;