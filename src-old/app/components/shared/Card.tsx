import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    onClick,
    hoverable = false,
    padding = 'md'
}) => {
    const paddingClasses = {
        none: '',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6'
    };
    
    const hoverClasses = hoverable ? 'hover:shadow-md cursor-pointer transition-shadow duration-200' : '';
    
    const classes = [
        'bg-surface rounded-lg shadow-sm border border-border-subtle',
        paddingClasses[padding],
        hoverClasses,
        className
    ].join(' ');
    
    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;