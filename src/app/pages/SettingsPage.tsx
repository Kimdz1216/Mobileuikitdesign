import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { useTheme, themeColors } from '../context/ThemeContext';
import {
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Star,
  Check,
  Tag,
  Store,
  FolderOpen,
} from 'lucide-react';

const themeColorMeta: Record<string, { label: string; hex: string }> = {
  purple: { label: '紫罗兰', hex: '#7C3AED' },
  blue: { label: '海洋蓝', hex: '#2563EB' },
  green: { label: '青草绿', hex: '#059669' },
  orange: { label: '橙日落', hex: '#EA580C' },
  pink: { label: '蔷薇粉', hex: '#DB2777' },
  teal: { label: '薄荷青', hex: '#0891B2' },
};

const settingGroups = [
  {
    title: '数据管理',
    items: [
      { icon: FolderOpen, title: '分类管理', description: '自定义商品与资产分类', key: 'category' },
      { icon: Store, title: '渠道管理', description: '管理常用购买渠道', key: 'channel' },
      { icon: Tag, title: '标签管理', description: '管理自定义商品标签', key: 'tag' },
    ],
  },
  {
    title: '通用设置',
    items: [
      { icon: Bell, title: '消息通知', description: '价格提醒与系统推送', key: 'notification' },
      { icon: Moon, title: '外观模式', description: '跟随系统', key: 'appearance' },
      { icon: Globe, title: '语言与地区', description: '简体中文 · 中国大陆', key: 'language' },
    ],
  },
  {
    title: '账户与安全',
    items: [
      { icon: Shield, title: '隐私与安全', description: '数据权限与账号保护', key: 'privacy' },
    ],
  },
  {
    title: '关于',
    items: [
      { icon: Star, title: '给个好评', description: '您的支持是我们的动力', key: 'rate' },
      { icon: HelpCircle, title: '帮助与反馈', description: '常见问题 · 联系我们', key: 'help' },
      { icon: FileText, title: '用户协议与隐私', description: '了解我们的条款与政策', key: 'terms' },
    ],
  },
];

export function SettingsPage() {
  const { themeColor, setThemeColor, color } = useTheme();
  const [currency, setCurrency] = useState('CNY');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA', paddingBottom: 72 }}>
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-5" style={{ borderBottom: '1px solid #F0F0F0' }}>
        <p className="text-[12px] tracking-widest mb-1" style={{ color: '#BABABA' }}>
          个人中心
        </p>
        <h1
          className="text-[22px] tracking-wide"
          style={{ color: '#111111', fontWeight: 600, letterSpacing: '0.02em' }}
        >
          设置
        </h1>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* User Profile Card */}
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          {/* Profile top */}
          <div className="px-5 py-5 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-[20px] flex-shrink-0"
              style={{ backgroundColor: color, fontWeight: 700 }}
            >
              张
            </div>
            <div className="flex-1">
              <p className="text-[17px] mb-0.5" style={{ color: '#111111', fontWeight: 600 }}>
                张小明
              </p>
              <p className="text-[13px]" style={{ color: '#AAAAAA' }}>
                zhangxm@example.com
              </p>
            </div>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#F5F5F7' }}
            >
              <ChevronRight size={15} strokeWidth={1.8} style={{ color: '#AAAAAA' }} />
            </div>
          </div>

          {/* Stats Strip */}
          <div
            className="flex px-5 py-4"
            style={{ borderTop: '1px solid #F5F5F5' }}
          >
            {[
              { label: '商品记录', value: '18' },
              { label: '资产数量', value: '5' },
              { label: '比价次数', value: '36' },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <div className="flex-1 text-center">
                  <p
                    className="text-[20px] mb-0.5"
                    style={{ color, fontWeight: 700, letterSpacing: '-0.01em' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[11px]" style={{ color: '#AAAAAA' }}>{s.label}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px self-stretch my-1" style={{ backgroundColor: '#F0F0F0' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Theme Color Selector */}
        <div
          className="bg-white rounded-2xl px-5 py-5"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[15px] tracking-wide" style={{ color: '#111111', fontWeight: 600 }}>
              主题颜色
            </p>
            <span className="text-[13px]" style={{ color: '#AAAAAA' }}>
              {themeColorMeta[themeColor].label}
            </span>
          </div>
          <div className="flex gap-3">
            {Object.entries(themeColors).map(([name, hex]) => {
              const isActive = themeColor === name;
              return (
                <button
                  key={name}
                  onClick={() => setThemeColor(name as keyof typeof themeColors)}
                  className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
                  style={{ backgroundColor: hex }}
                  aria-label={themeColorMeta[name].label}
                  title={themeColorMeta[name].label}
                >
                  {isActive && (
                    <Check size={15} strokeWidth={3} className="text-white" />
                  )}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ boxShadow: `0 0 0 2.5px #fff, 0 0 0 4px ${hex}` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Currency */}
        <div
          className="bg-white rounded-2xl px-5 py-5"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <p className="text-[15px] tracking-wide mb-3" style={{ color: '#111111', fontWeight: 600 }}>
            货币单位
          </p>
          <div className="flex gap-2">
            {['CNY', 'USD', 'EUR', 'JPY'].map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className="px-4 py-2 rounded-xl text-[13px] border transition-all"
                style={
                  currency === c
                    ? { borderColor: color, color, backgroundColor: '#fff', fontWeight: 600 }
                    : { borderColor: '#EBEBEB', color: '#AAAAAA', backgroundColor: '#fff' }
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Groups */}
        {settingGroups.map((group) => (
          <div key={group.title}>
            <p
              className="text-[11px] tracking-widest px-1 mb-2"
              style={{ color: '#BABABA' }}
            >
              {group.title.toUpperCase()}
            </p>
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
            >
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    className="w-full flex items-center gap-3 px-5 py-4 active:bg-[#FAFAFA] transition-colors"
                    style={{
                      borderBottom: i < group.items.length - 1 ? '1px solid #F5F5F5' : 'none',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#F5F5F7' }}
                    >
                      <Icon size={15} strokeWidth={1.8} style={{ color: '#888888' }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[14px]" style={{ color: '#222222' }}>{item.title}</p>
                      <p className="text-[12px]" style={{ color: '#AAAAAA' }}>{item.description}</p>
                    </div>
                    <ChevronRight size={15} strokeWidth={1.5} style={{ color: '#DDDDDD' }} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <button className="w-full flex items-center justify-center gap-2 px-5 py-4 active:bg-red-50 transition-colors">
            <LogOut size={15} strokeWidth={1.8} style={{ color: '#E0415A' }} />
            <span className="text-[14px]" style={{ color: '#E0415A', fontWeight: 500 }}>
              退出登录
            </span>
          </button>
        </div>

        <p className="text-center text-[11px] tracking-widest py-2" style={{ color: '#DDDDDD' }}>
          V 1.0.0 · 比价小助手
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
