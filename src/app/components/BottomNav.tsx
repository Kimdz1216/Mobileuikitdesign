import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ShoppingBag, BarChart2, Layers, Settings } from 'lucide-react';

const tabs = [
  { path: '/', label: '比价', icon: ShoppingBag },
  { path: '/dashboard', label: '统计', icon: BarChart2 },
  { path: '/assets', label: '资产', icon: Layers },
  { path: '/settings', label: '设置', icon: Settings },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white"
      style={{
        maxWidth: 412,
        borderTop: '1px solid #F0F0F0',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex justify-around items-center h-[58px]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-[4px] flex-1 py-2 transition-opacity active:opacity-60"
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
                style={{ color: isActive ? 'var(--theme-color)' : '#C0C0C8' }}
              />
              <span
                className="text-[10px] tracking-wide"
                style={{
                  color: isActive ? 'var(--theme-color)' : '#C0C0C8',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
