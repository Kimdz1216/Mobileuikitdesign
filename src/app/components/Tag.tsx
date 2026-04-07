import React from 'react';

interface TagProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ children, selected = false, onClick, className = '' }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-[13px] border transition-all whitespace-nowrap ${className}`}
      style={
        selected
          ? {
              borderColor: 'var(--theme-color)',
              color: 'var(--theme-color)',
              backgroundColor: '#fff',
              fontWeight: 500,
            }
          : {
              borderColor: '#EBEBEB',
              color: '#AAAAAA',
              backgroundColor: '#fff',
            }
      }
    >
      {children}
    </button>
  );
}