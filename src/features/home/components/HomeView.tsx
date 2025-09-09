"use client";

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Fullscreen, FullscreenExit } from 'react-bootstrap-icons';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useNotesStore } from '@/features/notes/store/notes.store';
import { useTaskStore } from '@/shared/store/personal-tasks.store';
import { useGroupsTasksStore } from '@/shared/store/groups-tasks.store';
import { Carousel, NoteCard } from '@/shared/components';
import TaskList from '@/shared/components/TaskList';
import { useFullscreen } from '@/lib/hooks/useFullScreen';
import { EmptyNotes, EmptyProjects } from '@/features/home/components';
import HomeLoadingSkeleton from './HomeLoadingSkeleton';

// We'll need to create a service and store for projects later
// For now, we'll just show an empty state

export default function HomeView() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { notes, isLoading: notesLoading, loadNotes } = useNotesStore();
  const { personalTasks, loadPersonalTasks } = useTaskStore();
  const { groups, loadGroupTasks } = useGroupsTasksStore();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  
  // Load data on mount
  useEffect(() => {
    loadNotes();
    loadPersonalTasks();
    // Load group tasks for each group (this is a simplified approach)
    // In a real implementation, we would have a groups store that loads groups
    // and then load tasks for each group
  }, [loadNotes, loadPersonalTasks]);

  if (!user) return null;

  // Filter groups to only show those with tasks for display
  const groupsWithTasks = groups.filter(group => group.tasks.length > 0);

  return (
    <div className='flex flex-col h-full'>
      <div className="relative">
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
            {t('home.welcome', { name: user.username.split(' ')[0] })}
          </h1>
          <p className="text-text-secondary mt-1">
            {t('home.subtitle')}
          </p>
        </header>

        {(notesLoading) ? (
          <HomeLoadingSkeleton />
        ) : (
          <>
            <section className="mb-10 max-w-5xl">
              {notes.length > 0  ? (
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
              {/* For now, we'll show empty projects since we don't have a projects store yet */}
              <>
                <h2 className="text-xl font-bold text-text-primary mb-4">{t('home.collaborativeProjects')}</h2>
                <EmptyProjects />
              </>
            </section>

            <TaskList 
              groupName=''
              title={t('home.personalTasks', 'Personal Tasks')} 
              tasks={personalTasks} 
            />

            <section className="mb-6">
              <h2 className="text-xl font-bold text-brand-subtle-2 mb-8">{t('home.groupTasksTitle', 'Group Tasks')}</h2>
              {groupsWithTasks.length > 0 ? (
                groupsWithTasks.map(group => (
                  <TaskList 
                    key={`tasks-${group.id}`}
                    title={group.name}
                    tasks={group.tasks}
                    // We don't have members data in the current store structure
                    // members={group.members}
                    isGroupTask={true}
                    groupId={group.id}
                    groupName={group.name}
                  />
                ))
              ) : (
                <div className="bg-surface rounded-xl shadow-sm overflow-hidden p-8 text-center">
                  <p className="text-text-secondary">No group tasks yet.</p>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}