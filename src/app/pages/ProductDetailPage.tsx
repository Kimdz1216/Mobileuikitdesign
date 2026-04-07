import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, Pencil, Trash2, Store, Calendar, CreditCard, Tag as TagIcon, Minus, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const mockDetail = {
  id: 1,
  name: '有机纯牛奶 250ml×12',
  category: '食品',
  store: '盒马鲜生',
  date: '2026年3月20日',
  unitPrice: 29.9,
  unit: '箱',
  unitDetail: '¥2.49/盒',
  payment: '微信支付',
  tags: ['有机认证', '低温冷链', '本地农场'],
  notes: '本地农场有机认证，低温配送，效期至4月初。盒马自营品质可靠，定期有满减活动。',
  competitors: [
    { store: '淘宝超市', price: 35.5, diff: '+5.6' },
    { store: '拼多多', price: 26.9, diff: '-3.0' },
    { store: '永辉超市', price: 38.0, diff: '+8.1' },
    { store: '盒马鲜生', price: 29.9, diff: '0', isCurrent: true },
  ],
};

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { color } = useTheme();
  const [quantity, setQuantity] = useState(2);

  const total = (mockDetail.unitPrice * quantity).toFixed(2);
  const cheapest = Math.min(...mockDetail.competitors.map((c) => c.price));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA', paddingBottom: 80 }}>
      {/* Nav Bar */}
      <div
        className="bg-white px-5 pt-12 pb-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid #F0F0F0' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:opacity-60"
          style={{ backgroundColor: '#F5F5F7' }}
        >
          <ChevronLeft size={18} strokeWidth={2} style={{ color: '#555555' }} />
        </button>
        <span
          className="text-[16px] tracking-wide"
          style={{ color: '#111111', fontWeight: 600 }}
        >
          商品详情
        </span>
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:opacity-60"
          style={{ backgroundColor: '#F5F5F7' }}
        >
          <Pencil size={15} strokeWidth={1.8} style={{ color: '#555555' }} />
        </button>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* Price Hero Card */}
        <div
          className="bg-white rounded-2xl px-5 pt-5 pb-5"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <p className="text-[11px] tracking-widest mb-2" style={{ color: '#BABABA' }}>
            {mockDetail.category.toUpperCase()}
          </p>
          <h2
            className="text-[18px] mb-5"
            style={{ color: '#111111', fontWeight: 600, lineHeight: 1.4, letterSpacing: '0.01em' }}
          >
            {mockDetail.name}
          </h2>

          {/* Price + Total */}
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-[11px] tracking-wide mb-1.5" style={{ color: '#BABABA' }}>最低单价</p>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-[32px]"
                  style={{ color, fontWeight: 700, letterSpacing: '-0.03em' }}
                >
                  ¥{mockDetail.unitPrice}
                </span>
                <span className="text-[13px]" style={{ color: '#BABABA' }}>
                  / {mockDetail.unit}
                </span>
              </div>
              <p className="text-[12px] mt-0.5" style={{ color: '#CCCCCC' }}>
                {mockDetail.unitDetail}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] tracking-wide mb-1.5" style={{ color: '#BABABA' }}>合计金额</p>
              <p
                className="text-[24px]"
                style={{ color: '#111111', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                ¥{total}
              </p>
            </div>
          </div>

          {/* Quantity Stepper */}
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{ backgroundColor: '#F8F8F8' }}
          >
            <span className="text-[13px]" style={{ color: '#888888' }}>购买数量</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-all active:opacity-60"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
              >
                <Minus size={13} strokeWidth={2.5} style={{ color: '#555555' }} />
              </button>
              <span
                className="text-[17px] w-6 text-center"
                style={{ color: '#111111', fontWeight: 600 }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all active:opacity-60"
                style={{ backgroundColor: color }}
              >
                <Plus size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Purchase Details Card */}
        <div
          className="bg-white rounded-2xl px-5 pt-5 pb-5"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <p
            className="text-[15px] mb-4 tracking-wide"
            style={{ color: '#111111', fontWeight: 600 }}
          >
            购买信息
          </p>
          <div className="space-y-0">
            {[
              { icon: Store, label: '购买门店', value: mockDetail.store },
              { icon: Calendar, label: '购买日期', value: mockDetail.date },
              { icon: CreditCard, label: '支付方式', value: mockDetail.payment },
            ].map((row, i, arr) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  className="flex items-center gap-3 py-3"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid #F5F5F5' : 'none' }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#F5F5F7' }}
                  >
                    <Icon size={14} strokeWidth={1.8} style={{ color: '#999999' }} />
                  </div>
                  <span className="text-[13px] flex-1" style={{ color: '#AAAAAA' }}>
                    {row.label}
                  </span>
                  <span className="text-[14px]" style={{ color: '#333333', fontWeight: 500 }}>
                    {row.value}
                  </span>
                </div>
              );
            })}

            {/* Tags */}
            <div
              className="flex items-start gap-3 py-3"
              style={{ borderTop: '1px solid #F5F5F5' }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: '#F5F5F7' }}
              >
                <TagIcon size={14} strokeWidth={1.8} style={{ color: '#999999' }} />
              </div>
              <span className="text-[13px] flex-1 pt-1.5" style={{ color: '#AAAAAA' }}>
                商品标签
              </span>
              <div className="flex flex-wrap gap-1.5 justify-end max-w-[180px]">
                {mockDetail.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-[3px] rounded-lg text-[11px]"
                    style={{ border: '1px solid #E8E8E8', color: '#888888' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Price Comparison Card */}
        <div
          className="bg-white rounded-2xl px-5 pt-5 pb-5"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <p
              className="text-[15px] tracking-wide"
              style={{ color: '#111111', fontWeight: 600 }}
            >
              多平台比价
            </p>
            <span className="text-[12px]" style={{ color: '#BABABA' }}>
              {mockDetail.competitors.length} 家门店
            </span>
          </div>

          <div className="space-y-0">
            {mockDetail.competitors
              .slice()
              .sort((a, b) => a.price - b.price)
              .map((item, i, arr) => {
                const isCheapest = item.price === cheapest;
                return (
                  <div
                    key={item.store}
                    className="flex items-center justify-between py-3"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid #F5F5F5' : 'none' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-semibold"
                        style={{
                          backgroundColor: isCheapest ? color : '#F5F5F7',
                          color: isCheapest ? '#fff' : '#AAAAAA',
                        }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-[14px]" style={{ color: '#333333' }}>
                        {item.store}
                      </span>
                      {item.isCurrent && (
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ border: `1px solid ${color}`, color }}
                        >
                          当前
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {item.price > cheapest ? (
                        <div className="flex items-center gap-0.5">
                          <TrendingUp size={11} strokeWidth={2} style={{ color: '#CCCCCC' }} />
                          <span className="text-[11px]" style={{ color: '#CCCCCC' }}>
                            +¥{(item.price - cheapest).toFixed(1)}
                          </span>
                        </div>
                      ) : item.price < cheapest ? null : (
                        <div className="flex items-center gap-0.5">
                          <TrendingDown size={11} strokeWidth={2} style={{ color }} />
                          <span className="text-[11px]" style={{ color }}>最低</span>
                        </div>
                      )}
                      <span
                        className="text-[16px]"
                        style={{
                          color: isCheapest ? color : '#555555',
                          fontWeight: isCheapest ? 700 : 500,
                        }}
                      >
                        ¥{item.price}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Notes Card */}
        {mockDetail.notes && (
          <div
            className="bg-white rounded-2xl px-5 pt-5 pb-5"
            style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
          >
            <p
              className="text-[15px] mb-3 tracking-wide"
              style={{ color: '#111111', fontWeight: 600 }}
            >
              备注
            </p>
            <p
              className="text-[14px] leading-relaxed"
              style={{ color: '#888888' }}
            >
              {mockDetail.notes}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white px-5 py-4 flex items-center gap-3"
        style={{ maxWidth: 412, borderTop: '1px solid #F0F0F0' }}
      >
        <button
          className="flex items-center gap-1.5 px-4 h-11 rounded-xl text-[14px] transition-all active:opacity-60"
          style={{ backgroundColor: '#F5F5F7', color: '#E0415A' }}
          onClick={() => navigate(-1)}
        >
          <Trash2 size={15} strokeWidth={1.8} />
          删除
        </button>
        <button
          className="flex-1 h-11 rounded-xl text-white text-[14px] transition-all active:opacity-80"
          style={{ backgroundColor: color, fontWeight: 500 }}
          onClick={() => navigate(`/edit/${id}`)}
        >
          编辑记录
        </button>
      </div>
    </div>
  );
}
