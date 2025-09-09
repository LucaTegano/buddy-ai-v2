import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'md',
    className = ''
}) => {
    const variantClasses = {
        default: 'bg-hover text-text-primary',
        primary: 'bg-brand-subtle-2 text-brand-primary',
        success: 'bg-success-subtle text-success',
        warning: 'bg-warning-subtle text-warning',
        error: 'bg-error-subtle text-error'
    };
    
    const sizeClasses = {
        sm: 'text-xs px-1.5 py-0.5',
        md: 'text-sm px-2 py-1',
        lg: 'text-base px-2.5 py-1.5'
    };
    
    const classes = [
        'inline-flex items-center justify-center font-medium rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className
    ].join(' ');
    
    return (
        <span className={classes}>
            {children}
        </span>
    );
};

export default Badge;