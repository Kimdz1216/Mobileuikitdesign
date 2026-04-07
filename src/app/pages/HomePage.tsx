import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { Plus, Search, ChevronRight, X, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ALL_CATEGORIES = ['全部', '食品', '日用', '数码', '服装', '家居', '美妆', '运动'];

const mockProducts = [
  {
    id: 1,
    name: '有机纯牛奶 250ml×12',
    category: '食品',
    bestPrice: 29.9,
    unit: '箱',
    unitDetail: '¥2.49/盒',
    store: '盒马鲜生',
    date: '03-20',
    priceCount: 3,
    saved: 8.1,
  },
  {
    id: 2,
    name: '无线降噪耳机 WH-1000XM5',
    category: '数码',
    bestPrice: 1799,
    unit: '个',
    unitDetail: '¥1799/个',
    store: '京东自营',
    date: '03-18',
    priceCount: 4,
    saved: 100,
  },
  {
    id: 3,
    name: '纯棉宽松 T 恤',
    category: '服装',
    bestPrice: 79,
    unit: '件',
    unitDetail: '¥79/件',
    store: 'UNIQLO',
    date: '03-15',
    priceCount: 2,
    saved: 10,
  },
  {
    id: 4,
    name: '北欧风落地灯 E27',
    category: '家居',
    bestPrice: 239,
    unit: '台',
    unitDetail: '¥239/台',
    store: '宜家',
    date: '03-12',
    priceCount: 3,
    saved: 20,
  },
  {
    id: 5,
    name: '防晒霜 SPF50+ 50ml',
    category: '美妆',
    bestPrice: 128,
    unit: '支',
    unitDetail: '¥256/100ml',
    store: '丝芙兰',
    date: '03-10',
    priceCount: 2,
    saved: 10,
  },
  {
    id: 6,
    name: '山姆 核桃油 500ml',
    category: '食品',
    bestPrice: 68,
    unit: '瓶',
    unitDetail: '¥13.6/100ml',
    store: 'Sam\'s Club',
    date: '03-08',
    priceCount: 3,
    saved: 12,
  },
  {
    id: 7,
    name: '洗手液 泡沫型 300ml',
    category: '日用',
    bestPrice: 12.9,
    unit: '瓶',
    unitDetail: '¥4.3/100ml',
    store: '超市',
    date: '03-06',
    priceCount: 4,
    saved: 5.1,
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { color } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const filteredProducts = mockProducts.filter((p) => {
    const matchCat = selectedCategory === '全部' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalSaved = mockProducts.reduce((s, p) => s + p.saved, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA', paddingBottom: 72 }}>
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[12px] tracking-widest mb-1" style={{ color: '#BABABA' }}>
              2026年3月 · 比价记录
            </p>
            <h1
              className="text-[22px] tracking-wide"
              style={{ color: '#111111', fontWeight: 600, letterSpacing: '0.02em' }}
            >
              比价小助手
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => setSearchActive(!searchActive)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:opacity-60"
              style={{ backgroundColor: '#F5F5F7' }}
            >
              <Search size={16} strokeWidth={1.8} style={{ color: '#888888' }} />
            </button>
            <button
              onClick={() => navigate('/edit')}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:opacity-60"
              style={{ backgroundColor: color }}
            >
              <Plus size={18} strokeWidth={2.2} className="text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar (expandable) */}
        {searchActive && (
          <div className="flex items-center gap-2 mb-4">
            <div
              className="flex-1 flex items-center gap-2 h-10 rounded-xl px-3"
              style={{ backgroundColor: '#F5F5F7' }}
            >
              <Search size={14} strokeWidth={1.8} style={{ color: '#BABABA' }} />
              <input
                autoFocus
                placeholder="搜索商品名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[14px] focus:outline-none"
                style={{ color: '#111111' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X size={14} strokeWidth={2} style={{ color: '#BABABA' }} />
                </button>
              )}
            </div>
            <button
              onClick={() => { setSearchActive(false); setSearchQuery(''); }}
              className="text-[13px] transition-opacity active:opacity-60"
              style={{ color: '#888888' }}
            >
              取消
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="flex gap-5 mb-4 pt-1">
          <div>
            <p className="text-[11px] tracking-wide mb-0.5" style={{ color: '#BABABA' }}>已记录</p>
            <p className="text-[15px] font-semibold" style={{ color: '#111111' }}>
              {mockProducts.length} <span className="text-[12px] font-normal" style={{ color: '#888888' }}>件</span>
            </p>
          </div>
          <div
            className="w-px self-stretch my-0.5"
            style={{ backgroundColor: '#F0F0F0' }}
          />
          <div>
            <p className="text-[11px] tracking-wide mb-0.5" style={{ color: '#BABABA' }}>累计省下</p>
            <p className="text-[15px] font-semibold" style={{ color }}>
              ¥{totalSaved.toFixed(1)}
            </p>
          </div>
          <div
            className="w-px self-stretch my-0.5"
            style={{ backgroundColor: '#F0F0F0' }}
          />
          <div>
            <p className="text-[11px] tracking-wide mb-0.5" style={{ color: '#BABABA' }}>分类数</p>
            <p className="text-[15px] font-semibold" style={{ color: '#111111' }}>
              {ALL_CATEGORIES.length - 1} <span className="text-[12px] font-normal" style={{ color: '#888888' }}>个</span>
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-0 overflow-x-auto -mx-5 px-5 pb-px scrollbar-none">
          <div className="flex gap-0 min-w-max">
            {ALL_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="relative px-3 py-3 text-[13px] tracking-wide whitespace-nowrap transition-colors"
                  style={{
                    color: isActive ? color : '#AAAAAA',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {cat}
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

      {/* Product List */}
      <div className="px-4 pt-4 space-y-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              themeColor={color}
              onClick={() => navigate(`/product/${product.id}`)}
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

function ProductCard({
  product,
  themeColor,
  onClick,
}: {
  product: (typeof mockProducts)[0];
  themeColor: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl cursor-pointer active:scale-[0.99] transition-transform overflow-hidden"
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
    >
      <div className="px-5 pt-4 pb-4">
        {/* Top row: category + date */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] tracking-widest" style={{ color: '#BABABA' }}>
            {product.category.toUpperCase()}
          </span>
          <span className="text-[11px]" style={{ color: '#CBCBCB' }}>
            {product.date}
          </span>
        </div>

        {/* Product name */}
        <p className="text-[15px] mb-3" style={{ color: '#111111', fontWeight: 500, lineHeight: 1.4 }}>
          {product.name}
        </p>

        {/* Divider */}
        <div className="mb-3" style={{ height: 1, backgroundColor: '#F5F5F5' }} />

        {/* Bottom row: price + store */}
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="text-[22px]"
              style={{ color: themeColor, fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              ¥{product.bestPrice}
            </span>
            <span className="text-[12px]" style={{ color: '#BABABA' }}>
              / {product.unit}
            </span>
            <span className="text-[11px]" style={{ color: '#CCCCCC' }}>
              {product.unitDetail}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-lg"
              style={{ backgroundColor: '#F7F7F7' }}
            >
              <span className="text-[11px]" style={{ color: '#999999' }}>
                {product.priceCount} 家比价
              </span>
            </div>
            <ChevronRight size={15} strokeWidth={1.5} style={{ color: '#DADADA' }} />
          </div>
        </div>
      </div>

      {/* Bottom accent stripe */}
      <div
        className="h-[3px] w-full"
        style={{ backgroundColor: '#F8F8F8' }}
      >
        <div
          className="h-full rounded-r-full"
          style={{
            width: `${Math.min(100, (product.priceCount / 5) * 100)}%`,
            backgroundColor: themeColor,
            opacity: 0.35,
          }}
        />
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
        <SlidersHorizontal size={28} strokeWidth={1.2} style={{ color: '#CCCCCC' }} />
      </div>
      <p className="text-[16px] mb-2" style={{ color: '#333333', fontWeight: 500 }}>
        还没有比价记录
      </p>
      <p
        className="text-[13px] text-center mb-8 leading-relaxed"
        style={{ color: '#AAAAAA' }}
      >
        记录商品价格，自动对比多平台差价
      </p>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 h-11 px-6 rounded-xl text-white text-[14px] transition-all active:opacity-80"
        style={{ backgroundColor: themeColor, fontWeight: 500 }}
      >
        <Plus size={15} strokeWidth={2.5} />
        添加第一条记录
      </button>
    </div>
  );
}
