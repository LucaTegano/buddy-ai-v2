import React from 'react';
import { useTranslation } from 'react-i18next';
import { Fullscreen, FullscreenExit } from 'react-bootstrap-icons';
import Header from '@/app/components/Home/Header';
import { useAppStore } from '../store/useAppStore';
import Carousel from '@/app/components/shared/Carousel';
import NoteCard from '@/app/components/shared/NoteCard';
import ProjectCard from '@/app/components/ProjectCard';
import TaskList from '@/app/components/TaskList';
import { EmptyNotes, EmptyProjects } from '@/app/components/Home';
import { useFullscreen } from '@/app/hooks/useFullScreen'; // Adjust path if needed

const Home: React.FC = () => {
    const { t } = useTranslation(); 
    const { user, notes, projects, groups, personalTasks } = useAppStore();
    const { isFullscreen, toggleFullscreen } = useFullscreen();

    if (!user) return null;

    return (
        <div className='pt-2 flex flex-col h-full'>
            <div className="relative">
                <Header/>
               <button
                    onClick={toggleFullscreen}
                    className="
                        absolute top-4 right-4 sm:right-6 lg:right-8 z-10
                        flex items-center gap-2 rounded-lg 
                        border border-border-subtle bg-bg-surface 
                        px-3 py-1.5 
                        text-sm font-medium text-text-secondary 
                        hover:bg-bg-hover hover:text-text-primary 
                        transition-colors duration-200 shadow-sm
                    "
                    title={isFullscreen ? t('home.exitFullscreen', 'Exit Fullscreen') : t('home.enterFullscreen', 'Enter Fullscreen')}
                >
                    {isFullscreen ? (
                        <FullscreenExit size={18} />
                    ) : (
                        <Fullscreen size={18} />
                    )}
                    {/* Responsive Text: Hidden on mobile, visible on sm screens and up */}
                    <span className="hidden sm:inline">
                        {isFullscreen ? t('general.exit', 'Exit') : t('general.fullscreen', 'Fullscreen')}
                    </span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-16">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-text-primary">
                        {t('home.welcome', { name: user.name.split(' ')[0] })}
                    </h1>
                    <p className="text-text-secondary mt-1">
                        {t('home.subtitle')}
                    </p>
                </header>

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

                <TaskList 
                    title={t('home.personalTasks', 'Personal Tasks')} 
                    tasks={personalTasks} 
                />

                <section className="mb-6">
                    <h2 className="text-xl font-bold text-brand-subtle-2 mb-8">{t('home.groupTasksTitle', 'Group Tasks')}</h2>
                    {groups.map(group => (
                        <TaskList 
                            key={`tasks-${group.id}`}
                            title={group.name}
                            tasks={group.tasks}
                            members={group.members}
                            isGroupTask={true}
                            groupId={group.id}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Home;