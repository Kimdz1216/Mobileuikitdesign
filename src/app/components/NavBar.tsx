import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface NavBarProps {
  title: string;
  rightAction?: {
    label: string;
    onClick: () => void;
  };
  showBack?: boolean;
  transparent?: boolean;
}

export function NavBar({ title, rightAction, showBack = true, transparent = false }: NavBarProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-between px-5 h-[56px] ${
        transparent ? 'bg-transparent' : 'bg-white'
      }`}
      style={transparent ? {} : { borderBottom: '1px solid #F4F4F6' }}
    >
      <div className="w-10">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={22} strokeWidth={2} className="text-gray-800" />
          </button>
        )}
      </div>
      <h1 className="text-[17px] font-semibold text-gray-900">{title}</h1>
      <div className="w-10 flex justify-end">
        {rightAction && (
          <button
            onClick={rightAction.onClick}
            className="text-[14px] font-medium"
            style={{ color: 'var(--theme-color)' }}
          >
            {rightAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
