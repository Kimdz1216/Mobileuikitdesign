import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, Package, ShoppingBag, Calculator, FileText, CalendarDays, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CATEGORIES = ['食品', '日用', '数码', '服装', '家居', '美妆', '运动', '其他'];
const STORES = ['盒马鲜生', '京东', '天猫', '拼多多', 'UNIQLO', '宜家', '超市', '其他'];
const PAYMENT_METHODS = ['微信支付', '支付宝', '银行卡', '现金'];
const UNITS = ['个', '件', '箱', '瓶', 'kg', 'g', 'L', 'ml'];

export function EditRecordPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { color } = useTheme();
  const isEdit = Boolean(id);

  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('个');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [notes, setNotes] = useState('');

  const totalPrice = (parseFloat(unitPrice) || 0) * (parseFloat(quantity) || 1);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA', paddingBottom: 88 }}>
      {/* Nav Bar */}
      <div
        className="bg-white px-5 pt-12 pb-4 flex items-center gap-3"
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
          className="flex-1 text-[17px] tracking-wide"
          style={{ color: '#111111', fontWeight: 600 }}
        >
          {isEdit ? '编辑记录' : '添加商品'}
        </span>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* Product Info */}
        <FormSection icon={Package} title="商品信息" themeColor={color}>
          <FormField label="商品名称">
            <input
              placeholder="请输入商品名称"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full h-11 px-4 rounded-xl text-[14px] focus:outline-none transition-colors"
              style={{
                border: '1.5px solid #EBEBEB',
                backgroundColor: '#FAFAFA',
                color: '#111111',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = color;
                e.target.style.backgroundColor = '#fff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#EBEBEB';
                e.target.style.backgroundColor = '#FAFAFA';
              }}
            />
          </FormField>
          <FormField label="商品分类">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <SelectTag
                  key={c}
                  label={c}
                  selected={selectedCategory === c}
                  onClick={() => setSelectedCategory(c)}
                  themeColor={color}
                />
              ))}
            </div>
          </FormField>
        </FormSection>

        {/* Purchase Info */}
        <FormSection icon={ShoppingBag} title="购买信息" themeColor={color}>
          <FormField label="购买门店">
            <div className="flex flex-wrap gap-2">
              {STORES.map((s) => (
                <SelectTag
                  key={s}
                  label={s}
                  selected={selectedStore === s}
                  onClick={() => setSelectedStore(s)}
                  themeColor={color}
                />
              ))}
            </div>
          </FormField>
          <FormField label="购买日期">
            <div
              className="flex items-center h-11 rounded-xl px-4 cursor-pointer"
              style={{ border: '1.5px solid #EBEBEB', backgroundColor: '#FAFAFA' }}
            >
              <CalendarDays size={14} strokeWidth={1.8} style={{ color: '#AAAAAA' }} className="mr-2" />
              <span className="text-[14px] flex-1" style={{ color: '#555555' }}>
                2026年3月26日
              </span>
              <ChevronDown size={14} strokeWidth={1.8} style={{ color: '#AAAAAA' }} />
            </div>
          </FormField>
          <FormField label="支付方式">
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((p) => (
                <SelectTag
                  key={p}
                  label={p}
                  selected={selectedPayment === p}
                  onClick={() => setSelectedPayment(p)}
                  themeColor={color}
                />
              ))}
            </div>
          </FormField>
        </FormSection>

        {/* Price & Spec */}
        <FormSection icon={Calculator} title="价格规格" themeColor={color}>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="单价（¥）">
              <div
                className="flex items-center h-11 rounded-xl px-4 transition-colors"
                style={{ border: '1.5px solid #EBEBEB', backgroundColor: '#FAFAFA' }}
                onFocusCapture={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = color;
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#fff';
                }}
                onBlurCapture={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#EBEBEB';
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FAFAFA';
                }}
              >
                <span className="text-[14px] mr-1.5" style={{ color: '#AAAAAA' }}>¥</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] focus:outline-none"
                  style={{ color: '#111111' }}
                />
              </div>
            </FormField>
            <FormField label="数量">
              <input
                type="number"
                placeholder="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-11 px-4 rounded-xl text-[14px] focus:outline-none transition-colors"
                style={{
                  border: '1.5px solid #EBEBEB',
                  backgroundColor: '#FAFAFA',
                  color: '#111111',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = color;
                  e.target.style.backgroundColor = '#fff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#EBEBEB';
                  e.target.style.backgroundColor = '#FAFAFA';
                }}
              />
            </FormField>
          </div>
          <FormField label="计量单位">
            <div className="flex gap-2 flex-wrap">
              {UNITS.map((u) => (
                <SelectTag
                  key={u}
                  label={u}
                  selected={unit === u}
                  onClick={() => setUnit(u)}
                  themeColor={color}
                />
              ))}
            </div>
          </FormField>

          {/* Auto Calculation */}
          {parseFloat(unitPrice) > 0 && (
            <div
              className="rounded-xl px-4 py-4"
              style={{ backgroundColor: '#F8F8F8' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-wide mb-1" style={{ color: '#AAAAAA' }}>
                    价格计算
                  </p>
                  <p className="text-[13px]" style={{ color: '#888888' }}>
                    ¥{unitPrice} × {quantity || 1} {unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] tracking-wide mb-1" style={{ color: '#AAAAAA' }}>合计</p>
                  <p
                    className="text-[22px]"
                    style={{ color, fontWeight: 700, letterSpacing: '-0.02em' }}
                  >
                    ¥{totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </FormSection>

        {/* Notes */}
        <FormSection icon={FileText} title="备注" themeColor={color}>
          <textarea
            placeholder="添加备注，如品牌、规格、产地、到期日等..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl text-[14px] placeholder:text-[#CCCCCC] focus:outline-none resize-none transition-colors"
            style={{
              border: '1.5px solid #EBEBEB',
              backgroundColor: '#FAFAFA',
              color: '#111111',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = color;
              e.target.style.backgroundColor = '#fff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#EBEBEB';
              e.target.style.backgroundColor = '#FAFAFA';
            }}
          />
        </FormSection>
      </div>

      {/* Bottom Action Bar */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white px-5 py-4 flex gap-3"
        style={{ maxWidth: 412, borderTop: '1px solid #F0F0F0' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="h-11 px-5 rounded-xl text-[14px] transition-all active:opacity-60"
          style={{ backgroundColor: '#F5F5F7', color: '#888888' }}
        >
          取消
        </button>
        <button
          className="flex-1 h-11 rounded-xl text-white text-[14px] transition-all active:opacity-80"
          style={{ backgroundColor: color, fontWeight: 500 }}
          onClick={() => navigate(-1)}
        >
          保存记录
        </button>
      </div>
    </div>
  );
}

function FormSection({
  icon: Icon,
  title,
  children,
  themeColor,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <div
      className="bg-white rounded-2xl px-5 py-5"
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: '#F5F5F7' }}
        >
          <Icon size={14} strokeWidth={1.8} style={{ color: '#888888' }} />
        </div>
        <p className="text-[15px] tracking-wide" style={{ color: '#111111', fontWeight: 600 }}>
          {title}
        </p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[12px] tracking-wide mb-2" style={{ color: '#AAAAAA' }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function SelectTag({
  label,
  selected,
  onClick,
  themeColor,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  themeColor: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-xl text-[13px] border transition-all"
      style={
        selected
          ? { borderColor: themeColor, color: themeColor, backgroundColor: '#fff', fontWeight: 500 }
          : { borderColor: '#EBEBEB', color: '#AAAAAA', backgroundColor: '#fff' }
      }
    >
      {label}
    </button>
  );
}
