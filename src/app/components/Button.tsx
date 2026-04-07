import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  fullWidth = false,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'h-8 px-4 text-[13px]',
    md: 'h-11 px-5 text-[14px]',
    lg: 'h-12 px-6 text-[15px]',
  };

  const variantStyles: Record<string, string> = {
    primary: 'text-white',
    secondary: 'bg-[#F5F5F7] text-gray-700',
    ghost: 'text-gray-500 bg-transparent',
    danger: 'text-[#E0415A] bg-transparent',
  };

  const primaryInline = variant === 'primary'
    ? { backgroundColor: 'var(--theme-color)' }
    : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={primaryInline}
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
