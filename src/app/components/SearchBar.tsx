import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({ placeholder = '搜索商品...', value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2"
        size={15}
        strokeWidth={1.8}
        style={{ color: '#BABABA' }}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-10 pl-10 pr-4 rounded-xl text-[14px] focus:outline-none transition-colors"
        style={{
          border: '1.5px solid #EBEBEB',
          backgroundColor: '#F8F8F8',
          color: '#111111',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--theme-color)';
          e.target.style.backgroundColor = '#fff';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#EBEBEB';
          e.target.style.backgroundColor = '#F8F8F8';
        }}
      />
    </div>
  );
}