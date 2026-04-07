import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { Plus, ChevronRight, Package } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const mockAssets = [
  {
    id: 1,
    name: '无线降噪耳机 WH-1000XM5',
    category: '数码',
    purchasePrice: 1899,
    purchaseDate: '2026-01-15',
    usageDays: 70,
    estimatedLifeDays: 1825,
    channel: '京东自营',
  },
  {
    id: 2,
    name: '咖啡机 DeLonghi EC235',
    category: '家居',
    purchasePrice: 899,
    purchaseDate: '2026-02-01',
    usageDays: 53,
    estimatedLifeDays: 3650,
    channel: '天猫旗舰店',
  },
  {
    id: 3,
    name: '跑步鞋 Nike Air Zoom',
    category: '运动',
    purchasePrice: 799,
    purchaseDate: '2026-01-10',
    usageDays: 75,
    estimatedLifeDays: 365,
    channel: 'Nike官方',
  },
  {
    id: 4,
    name: '机械键盘 IKBC C87',
    category: '数码',
    purchasePrice: 329,
    purchaseDate: '2025-12-20',
    usageDays: 96,
    estimatedLifeDays: 3650,
    channel: '京东自营',
  },
  {
    id: 5,
    name: 'iPad Pro 11英寸 M4',
    category: '数码',
    purchasePrice: 6999,
    purchaseDate: '2025-11-01',
    usageDays: 145,
    estimatedLifeDays: 1460,
    channel: 'Apple官方',
  },
];

const totalValue = mockAssets.reduce((sum, a) => sum + a.purchasePrice, 0);
const avgDailyAll = mockAssets.reduce((sum, a) => sum + a.purchasePrice / a.usageDays, 0);

const FILTERS = ['全部', '数码', '家居', '运动'];

export function AssetPage() {
  const navigate = useNavigate();
  const { color } = useTheme();
  const [filter, setFilter] = useState('全部');

  const filtered = filter === '全部' ? mockAssets : mockAssets.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA', paddingBottom: 72 }}>
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[12px] tracking-widest mb-1" style={{ color: '#BABABA' }}>
              资产管理
            </p>
            <h1
              className="text-[22px] tracking-wide"
              style={{ color: '#111111', fontWeight: 600, letterSpacing: '0.02em' }}
            >
              我的资产
            </h1>
          </div>
          <button
            onClick={() => navigate('/edit')}
            className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-white text-[13px] transition-all active:opacity-80 mt-1"
            style={{ backgroundColor: color, fontWeight: 500 }}
          >
            <Plus size={14} strokeWidth={2.5} />
            添加
          </button>
        </div>

        {/* Summary Stat Strip */}
        <div className="flex gap-0 mb-4">
          <div className="flex-1">
            <p className="text-[11px] tracking-wide mb-1" style={{ color: '#BABABA' }}>总资产价值</p>
            <p className="text-[20px]" style={{ color, fontWeight: 700, letterSpacing: '-0.02em' }}>
              ¥{totalValue.toLocaleString()}
            </p>
          </div>
          <div className="w-px self-stretch mx-4 my-1" style={{ backgroundColor: '#F0F0F0' }} />
          <div className="flex-1">
            <p className="text-[11px] tracking-wide mb-1" style={{ color: '#BABABA' }}>日均消耗</p>
            <p className="text-[20px]" style={{ color: '#111111', fontWeight: 700, letterSpacing: '-0.02em' }}>
              ¥{avgDailyAll.toFixed(1)}
            </p>
          </div>
          <div className="w-px self-stretch mx-4 my-1" style={{ backgroundColor: '#F0F0F0' }} />
          <div className="flex-1">
            <p className="text-[11px] tracking-wide mb-1" style={{ color: '#BABABA' }}>资产数量</p>
            <p className="text-[20px]" style={{ color: '#111111', fontWeight: 700 }}>
              {mockAssets.length}<span className="text-[14px] font-normal" style={{ color: '#888888' }}> 件</span>
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-0 overflow-x-auto -mx-5 px-5 pb-px scrollbar-none">
          <div className="flex gap-0 min-w-max">
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="relative px-3 py-3 text-[13px] tracking-wide whitespace-nowrap transition-colors"
                  style={{
                    color: isActive ? color : '#AAAAAA',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {f}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Asset List */}
      <div className="px-4 pt-4 space-y-3">
        {filtered.length > 0 ? (
          filtered.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              themeColor={color}
              onClick={() => navigate(`/product/${asset.id}`)}
            />
          ))
        ) : (
          <EmptyState onAdd={() => navigate('/edit')} themeColor={color} />
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function AssetCard({
  asset,
  themeColor,
  onClick,
}: {
  asset: (typeof mockAssets)[0];
  themeColor: string;
  onClick: () => void;
}) {
  const dailyCost = (asset.purchasePrice / asset.usageDays).toFixed(2);
  const usagePct = Math.min(Math.round((asset.usageDays / asset.estimatedLifeDays) * 100), 100);

  const purchaseDate = new Date(asset.purchaseDate).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
    >
      <div className="px-5 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 mr-3">
            <p className="text-[11px] tracking-widest mb-1.5" style={{ color: '#BABABA' }}>
              {asset.category.toUpperCase()}
            </p>
            <p className="text-[15px]" style={{ color: '#111111', fontWeight: 500, lineHeight: 1.4 }}>
              {asset.name}
            </p>
          </div>
          <ChevronRight size={16} strokeWidth={1.5} style={{ color: '#DADADA', marginTop: 18 }} />
        </div>

        {/* Divider */}
        <div className="mb-3" style={{ height: 1, backgroundColor: '#F5F5F5' }} />

        {/* Price Row */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[11px] tracking-wide mb-1" style={{ color: '#BABABA' }}>购入价格</p>
            <p
              className="text-[22px]"
              style={{ color: themeColor, fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              ¥{asset.purchasePrice.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] tracking-wide mb-1" style={{ color: '#BABABA' }}>
              已用 {asset.usageDays} 天
            </p>
            <p className="text-[16px]" style={{ color: '#333333', fontWeight: 600 }}>
              ¥{dailyCost}
              <span className="text-[12px] font-normal" style={{ color: '#AAAAAA' }}> / 天</span>
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <span className="text-[11px] tracking-wide" style={{ color: '#BABABA' }}>使用寿命进度</span>
            <span className="text-[11px]" style={{ color: '#BABABA' }}>{usagePct}%</span>
          </div>
          <div
            className="h-[3px] w-full rounded-full overflow-hidden"
            style={{ backgroundColor: '#F0F0F0' }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${usagePct}%`,
                backgroundColor: themeColor,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="text-[11px]" style={{ color: '#CCCCCC' }}>
            {purchaseDate} · {asset.channel}
          </p>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ border: '1px solid #EBEBEB', color: '#AAAAAA' }}
          >
            预计 {Math.round(asset.estimatedLifeDays / 365)} 年寿命
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onAdd, themeColor }: { onAdd: () => void; themeColor: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-8">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: '#F5F5F7' }}
      >
        <Package size={28} strokeWidth={1.2} style={{ color: '#CCCCCC' }} />
      </div>
      <p className="text-[16px] mb-2" style={{ color: '#333333', fontWeight: 500 }}>
        还没有资产记录
      </p>
      <p className="text-[13px] text-center mb-8 leading-relaxed" style={{ color: '#AAAAAA' }}>
        记录大宗物品，追踪使用价值与日均消耗
      </p>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 h-11 px-6 rounded-xl text-white text-[14px] transition-all active:opacity-80"
        style={{ backgroundColor: themeColor, fontWeight: 500 }}
      >
        <Plus size={15} strokeWidth={2.5} />
        添加第一件资产
      </button>
    </div>
  );
}
