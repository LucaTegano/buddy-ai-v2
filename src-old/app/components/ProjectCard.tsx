"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Project } from '@/app/models/types';

interface ProjectCardProps {
    project: Project;
}

const AvatarStack: React.FC<{ team: { name: string, picture: string }[] }> = ({ team }) => (
    <div className="flex -space-x-2">
        {team.slice(0, 3).map((member, index) => (
            <img
                key={index}
                className="w-8 h-8 rounded-full border-2 border-surface object-cover"
                src={member.picture}
                alt={member.name}
                title={member.name}
            />
        ))}
        {team.length > 3 && (
            <div className="flex items-center justify-center w-8 h-8 text-xs font-semibold text-brand-primary bg-brand-subtle rounded-full border-2 border-surface">
                +{team.length - 3}
            </div>
        )}
    </div>
);


const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { t } = useTranslation();
    return (
        <div className="flex-shrink-0 w-72 snap-start bg-surface p-5 rounded-xl border border-border-subtle shadow-lg shadow-subtle cursor-pointer group hover:border-brand-primary hover:-translate-y-1 transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-text-primary group-hover:text-brand-primary transition-colors">{project.title}</h3>
                <AvatarStack team={project.team} />
            </div>
            
            <div className="mb-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-text-secondary">{t('projectCard.progress')}</span>
                    <span className="text-xs font-semibold text-brand-primary">{project.progress}%</span>
                </div>
                <div className="w-full bg-hover rounded-full h-2">
                    <div 
                        className="bg-brand-primary h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>

            <p className="text-xs text-text-secondary mt-3 truncate">
                <span className="font-medium">{t('projectCard.lastActivity')}</span> {project.lastActivity}
            </p>
        </div>
    );
};

export default ProjectCard;