'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import type { CollectionsPoint, EnrollmentPoint } from '@/features/dashboard/types';

// Small, unobtrusive legend
function SmallLegend({ payload, labels }: { payload?: any[]; labels?: Record<string, string> }) {
  if (!payload || payload.length === 0) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, paddingTop: 12, marginTop: 4, paddingBottom: 10, marginBottom: 4 }}>
      {payload.map((entry) => {
        const color = entry.color;
        const name = labels?.[entry.value] ?? entry.value;
        return (
          <div key={entry.value} style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#6b7280' }}>
            <span style={{ width: 8, height: 8, backgroundColor: color, borderRadius: 9999, display: 'inline-block', marginRight: 6 }} />
            <span style={{ whiteSpace: 'nowrap' }}>{name}</span>
          </div>
        );
      })}
    </div>
  );
}

export function EnrollmentLineChart({ data }: { data: EnrollmentPoint[] }) {
  const COLORS = {
    mbbs: '#10B981', // emerald
    pg: '#9CA3AF',   // gray
  } as const;

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
          <Tooltip formatter={(value: any, name) => [value, name === 'mbbs' ? 'MBBS Students' : 'Postgraduate']} />
          <Legend verticalAlign="bottom" height={20} content={<SmallLegend labels={{ mbbs: 'MBBS Students', pg: 'Postgraduate' }} />} />
          <Line type="basis" dataKey="mbbs" stroke={COLORS.mbbs} strokeWidth={2.5} dot={false} isAnimationActive />
          <Line type="basis" dataKey="pg" stroke={COLORS.pg} strokeWidth={2} dot={false} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FinancialAreaChart({ data, label = 'Collections' }: { data: CollectionsPoint[]; label?: string }) {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="finGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
          <Tooltip formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']} />
          <Legend verticalAlign="bottom" height={20} content={<SmallLegend labels={{ amount: label }} />} />
          <Area type="basis" dataKey="amount" stroke="#10B981" strokeWidth={2.5} fill="url(#finGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FinancialBarChart() {
  const data = [
    { month: 'jan', amount: 42 },
    { month: 'feb', amount: 48 },
    { month: 'mar', amount: 55 },
    { month: 'apr', amount: 60 },
    { month: 'may', amount: 66 },
    { month: 'jun', amount: 62 },
    { month: 'jul', amount: 70 },
    { month: 'aug', amount: 78 },
  ];

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
          <Tooltip />
          <Bar dataKey="amount" fill="#059669" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
