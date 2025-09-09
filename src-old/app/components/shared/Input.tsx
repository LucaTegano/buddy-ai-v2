import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}) => {
    const inputClasses = [
        'bg-primary border rounded-md py-2 px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent',
        error ? 'border-error' : 'border-border-subtle',
        icon && iconPosition === 'left' ? 'pl-10' : '',
        icon && iconPosition === 'right' ? 'pr-10' : '',
        className
    ].join(' ');
    
    const containerClasses = [
        'relative',
        fullWidth ? 'w-full' : ''
    ].join(' ');
    
    return (
        <div className={containerClasses}>
            {label && (
                <label className="block text-sm font-medium text-text-secondary mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-text-disabled">{icon}</span>
                    </div>
                )}
                <input className={inputClasses} {...props} />
                {icon && iconPosition === 'right' && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-text-disabled">{icon}</span>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-error">{error}</p>
            )}
        </div>
    );
};

export default Input;