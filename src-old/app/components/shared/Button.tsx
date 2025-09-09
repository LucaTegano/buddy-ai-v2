import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success' | 'error';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon,
    iconPosition = 'left',
    children,
    className = '',
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary';
    
    const variantClasses = {
        primary: 'bg-brand-primary text-white hover:bg-brand-hover',
        secondary: 'bg-brand-subtle-2 text-text-primary hover:bg-brand-subtle-1',
        outline: 'border border-border-subtle text-text-primary hover:bg-hover',
        danger: 'bg-error text-white hover:bg-error-hover',
        ghost: 'text-text-primary hover:bg-hover',
        success: 'bg-success text-white hover:bg-success-hover',
        error: 'bg-error text-white hover:bg-error-hover'
    };
    
    const sizeClasses = {
        sm: 'text-xs px-2.5 py-1.5',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-6 py-3'
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        className
    ].join(' ');
    
    return (
        <button className={classes} {...props}>
            {icon && iconPosition === 'left' && (
                <span className="mr-2">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <span className="ml-2">{icon}</span>
            )}
        </button>
    );
};

export default Button;