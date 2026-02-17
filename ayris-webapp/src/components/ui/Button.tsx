import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'accent' | 'outline' | 'emerald' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
    const baseClasses = 'btn';
    const variantClasses = {
        primary: 'btn-primary',
        accent: 'btn-accent',
        emerald: 'btn-emerald',
        secondary: 'btn-secondary',
        outline: 'btn-outline'
    };
    const sizeClasses = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg'
    };

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;
