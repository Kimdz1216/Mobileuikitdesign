import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const spendingData = [
  { month: '10月', amount: 1240 },
  { month: '11月', amount: 980 },
  { month: '12月', amount: 1560 },
  { month: '1月', amount: 890 },
  { month: '2月', amount: 1120 },
  { month: '3月', amount: 1480 },
];

const categoryData = [
  { name: '数码', amount: 2228, count: 3 },
  { name: '食品', amount: 320, count: 8 },
  { name: '服装', amount: 356, count: 4 },
  { name: '家居', amount: 1158, count: 2 },
  { name: '美妆', amount: 138, count: 1 },
];

const PERIODS = ['近7天', '近30天', '近3月', '近半年'];

const totalSpent = spendingData.reduce((s, d) => s + d.amount, 0);
const avgMonthly = Math.round(totalSpent / spendingData.length);
const totalItems = categoryData.reduce((s, d) => s + d.count, 0);
const maxAmount = Math.max(...categoryData.map((d) => d.amount));

const prevMonthSpending = spendingData[spendingData.length - 2].amount;
const currMonthSpending = spendingData[spendingData.length - 1].amount;
const monthChange = Math.round(((currMonthSpending - prevMonthSpending) / prevMonthSpending) * 100);

export function DashboardPage() {
  const { color } = useTheme();
  const [period, setPeriod] = useState('近3月');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA', paddingBottom: 72 }}>
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-5" style={{ borderBottom: '1px solid #F0F0F0' }}>
        <p className="text-[12px] tracking-widest mb-1" style={{ color: '#BABABA' }}>
          数据概览
        </p>
        <h1
          className="text-[22px] tracking-wide"
          style={{ color: '#111111', fontWeight: 600, letterSpacing: '0.02em' }}
        >
          消费看板
        </h1>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <SummaryCard
            label="累计消费"
            value={`¥${(totalSpent / 1000).toFixed(1)}K`}
            sub="近半年"
            themeColor={color}
            highlight
          />
          <SummaryCard
            label="月均消费"
            value={`¥${avgMonthly}`}
            sub="平均值"
            themeColor={color}
          />
          <SummaryCard
            label="商品记录"
            value={`${totalItems}`}
            sub="件"
            themeColor={color}
          />
        </div>

        {/* Spending Trend */}
        <div
          className="bg-white rounded-2xl px-5 pt-5 pb-4"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-[15px] tracking-wide" style={{ color: '#111111', fontWeight: 600 }}>
              消费趋势
            </p>
            <div className="flex items-center gap-1.5">
              {monthChange > 0 ? (
                <ArrowUpRight size={13} strokeWidth={2} style={{ color: '#E0415A' }} />
              ) : monthChange < 0 ? (
                <ArrowDownRight size={13} strokeWidth={2} style={{ color: '#22AA6F' }} />
              ) : (
                <Minus size={13} strokeWidth={2} style={{ color: '#BABABA' }} />
              )}
              <span
                className="text-[12px]"
                style={{
                  color: monthChange > 0 ? '#E0415A' : monthChange < 0 ? '#22AA6F' : '#BABABA',
                  fontWeight: 500,
                }}
              >
                {monthChange > 0 ? '+' : ''}{monthChange}% 环比
              </span>
            </div>
          </div>

          {/* Period Filter */}
          <div className="flex gap-1.5 mb-4">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-2.5 py-1 rounded-lg text-[11px] border transition-all"
                style={
                  period === p
                    ? { borderColor: color, color, backgroundColor: '#fff', fontWeight: 500 }
                    : { borderColor: '#EBEBEB', color: '#CCCCCC', backgroundColor: '#fff' }
                }
              >
                {p}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={spendingData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#CCCCCC' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#CCCCCC' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                  fontSize: 13,
                  padding: '8px 14px',
                  color: '#333333',
                }}
                formatter={(value: number) => [`¥${value.toLocaleString()}`, '消费额']}
                labelStyle={{ color: '#888888', marginBottom: 2 }}
                cursor={{ fill: '#F8F8F8' }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {spendingData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.month}`}
                    fill={index === spendingData.length - 1 ? color : '#EBEBEB'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div
          className="bg-white rounded-2xl px-5 pt-5 pb-5"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[15px] tracking-wide" style={{ color: '#111111', fontWeight: 600 }}>
              分类消费
            </p>
            <span className="text-[12px]" style={{ color: '#BABABA' }}>
              ¥{totalSpent.toLocaleString()} 总计
            </span>
          </div>

          <div className="space-y-4">
            {categoryData
              .slice()
              .sort((a, b) => b.amount - a.amount)
              .map((cat, i) => {
                const pct = Math.round((cat.amount / totalSpent) * 100);
                const barWidth = Math.round((cat.amount / maxAmount) * 100);
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: i === 0 ? color : '#DDDDDD' }}
                        />
                        <span className="text-[13px]" style={{ color: '#444444' }}>
                          {cat.name}
                        </span>
                        <span className="text-[11px]" style={{ color: '#CCCCCC' }}>
                          {cat.count} 件
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px]" style={{ color: '#CCCCCC' }}>{pct}%</span>
                        <span
                          className="text-[14px]"
                          style={{ color: i === 0 ? color : '#555555', fontWeight: i === 0 ? 700 : 500 }}
                        >
                          ¥{cat.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div
                      className="h-[3px] w-full rounded-full overflow-hidden"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: i === 0 ? color : '#E0E0E0',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Monthly Comparison List */}
        <div
          className="bg-white rounded-2xl px-5 pt-5 pb-2"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <p className="text-[15px] tracking-wide mb-4" style={{ color: '#111111', fontWeight: 600 }}>
            月度明细
          </p>
          {spendingData
            .slice()
            .reverse()
            .map((d, i, arr) => {
              const isMax = d.amount === Math.max(...spendingData.map((x) => x.amount));
              const isFirst = i === 0;
              const prevAmount = arr[i + 1]?.amount;
              const change = prevAmount
                ? Math.round(((d.amount - prevAmount) / prevAmount) * 100)
                : null;

              return (
                <div
                  key={d.month}
                  className="flex items-center justify-between py-3"
                  style={{
                    borderBottom: i < arr.length - 1 ? '1px solid #F5F5F5' : 'none',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-[12px]"
                      style={{
                        backgroundColor: isFirst ? color : '#F5F5F7',
                        color: isFirst ? '#fff' : '#AAAAAA',
                        fontWeight: isFirst ? 600 : 400,
                      }}
                    >
                      {d.month.replace('月', '')}
                    </div>
                    <div>
                      <span className="text-[14px]" style={{ color: '#333333' }}>
                        {d.month}
                      </span>
                      {isMax && (
                        <span
                          className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full"
                          style={{ border: `1px solid ${color}`, color }}
                        >
                          最高
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {change !== null && (
                      <span
                        className="text-[11px]"
                        style={{
                          color: change > 0 ? '#E0415A' : change < 0 ? '#22AA6F' : '#CCCCCC',
                        }}
                      >
                        {change > 0 ? '↑' : change < 0 ? '↓' : '—'}
                        {Math.abs(change)}%
                      </span>
                    )}
                    <span
                      className="text-[15px]"
                      style={{
                        color: isFirst ? color : '#374151',
                        fontWeight: isFirst ? 700 : 500,
                      }}
                    >
                      ¥{d.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Spending Line Chart – 近半年趋势折线 */}
        <div
          className="bg-white rounded-2xl px-5 pt-5 pb-4"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
        >
          <p className="text-[15px] tracking-wide mb-4" style={{ color: '#111111', fontWeight: 600 }}>
            走势折线
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={spendingData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#CCCCCC' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#CCCCCC' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                  fontSize: 13,
                  padding: '8px 14px',
                }}
                formatter={(value: number) => [`¥${value.toLocaleString()}`, '消费额']}
                labelStyle={{ color: '#888888' }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke={color}
                strokeWidth={2.5}
                dot={{ r: 3, fill: color, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: color, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  themeColor,
  highlight = false,
}: {
  label: string;
  value: string;
  sub: string;
  themeColor: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="bg-white rounded-2xl p-4"
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
    >
      <p className="text-[10px] tracking-wide mb-2" style={{ color: '#BABABA' }}>
        {label}
      </p>
      <p
        className="text-[15px] mb-0.5"
        style={{
          color: highlight ? themeColor : '#111111',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </p>
      <p className="text-[10px]" style={{ color: '#CCCCCC' }}>{sub}</p>
    </div>
  );
}