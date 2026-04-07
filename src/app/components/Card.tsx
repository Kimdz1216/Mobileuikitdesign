import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: boolean;
}

export function Card({ children, className = '', onClick, padding = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl ${padding ? 'p-5' : ''} ${onClick ? 'cursor-pointer active:scale-[0.99] transition-transform' : ''} ${className}`}
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
    >
      {children}
    </div>
  );
}