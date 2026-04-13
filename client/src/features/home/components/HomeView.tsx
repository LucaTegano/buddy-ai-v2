"use client";

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useNotesStore } from '@/features/notes/store/notes.store';
import { useTaskStore } from '@/shared/store/personal-tasks.store';
import { Carousel, NoteCard } from '@/shared/components';
import TaskList from '@/shared/components/TaskList';
import { useFullscreen } from '@/lib/hooks/useFullScreen';
import { EmptyNotes } from '@/features/home/components';
import HomeLoadingSkeleton from './HomeLoadingSkeleton';

export default function HomeView() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { notes, isLoading: notesLoading, loadNotes } = useNotesStore();
  const { personalTasks, loadPersonalTasks } = useTaskStore();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      const lng = window.location.pathname.split('/')[1] || 'en';
      router.push(`/${lng}/login`);
      return;
    }
    loadNotes();
    loadPersonalTasks();
  }, [user, loadNotes, loadPersonalTasks, router]);

  if (!user) return <HomeLoadingSkeleton />;

  return (
    <div className='flex flex-col h-full animate-in fade-in duration-700'>
      <div className="relative">
        <button
          onClick={toggleFullscreen}
          className="
            absolute top-0 right-0 z-10
            flex items-center gap-2 rounded-full 
            border border-border-subtle bg-secondary 
            px-4 py-2 
            text-sm font-medium text-text-secondary 
            hover:bg-bg-hover hover:text-text-primary 
            transition-all duration-200 shadow-sm
          "
          title={isFullscreen ? t('home.exitFullscreen') : t('home.enterFullscreen')}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          <span className="hidden sm:inline">
            {isFullscreen ? t('general.exit') : t('general.fullscreen')}
          </span>
        </button>
      </div>

      <div className="flex-1 p-2 sm:p-4 pb-16">
        <header className="mb-10 mt-2">
          <h1 className="text-4xl font-extrabold text-text-primary tracking-tight">
            {t('home.welcome', { name: user.username.split(' ')[0] })}
          </h1>
          <p className="text-xl text-text-secondary mt-2 max-w-2xl leading-relaxed">
            {t('home.subtitle')}
          </p>
        </header>

        {(notesLoading) ? (
          <HomeLoadingSkeleton />
        ) : (
          <div className="space-y-12">
            <section className="max-w-6xl">
              {notes.length > 0  ? (
                <Carousel title={t('home.recentNotes')}>
                  {notes.map(note => <NoteCard key={note.id} note={note} />)}
                </Carousel>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-text-primary mb-6">{t('home.recentNotes')}</h2>
                  <EmptyNotes />
                </>
              )}
            </section>

            <section className="max-w-5xl">
              <TaskList 
                groupName=''
                title={t('home.personalTasks', 'Personal Tasks')} 
                tasks={personalTasks} 
              />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}