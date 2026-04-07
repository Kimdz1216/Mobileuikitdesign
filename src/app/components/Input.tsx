import React, { useState } from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'tel';
  className?: string;
  prefix?: string;
  suffix?: string;
  readOnly?: boolean;
}

export function Input({
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  prefix,
  suffix,
  readOnly = false,
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex items-center h-11 rounded-xl overflow-hidden transition-all ${className}`}
      style={{
        border: focused ? '1.5px solid var(--theme-color)' : '1.5px solid #EBEBEB',
        backgroundColor: focused ? '#fff' : '#F8F8F8',
      }}
    >
      {prefix && (
        <span className="pl-4 text-[14px] select-none whitespace-nowrap" style={{ color: '#AAAAAA' }}>
          {prefix}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 h-full px-4 text-[14px] bg-transparent focus:outline-none"
        style={{ color: '#111111' }}
      />
      {suffix && (
        <span className="pr-4 text-[14px] select-none whitespace-nowrap" style={{ color: '#AAAAAA' }}>
          {suffix}
        </span>
      )}
    </div>
  );
}