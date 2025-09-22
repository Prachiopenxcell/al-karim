import type { MonthKey } from '@/types/common';

export interface EnrollmentPoint {
  month: MonthKey;
  mbbs: number;
  pg: number;
}

export interface CollectionsPoint {
  month: MonthKey;
  amount: number;
}

export interface RecentActivityItem {
  name: string;
  tag: 'pending' | 'success' | 'processing';
  desc: string;
  time: string;
  amount: string;
}

export interface DepartmentOverview {
  name: string;
  value: string; // e.g., "485/500"
  percent: number; // 0-100
  tag: 'excellent' | 'good' | 'average';
}

export interface StatTile {
  title: string;
  value: string;
  change: string;
  direction: 'up' | 'down';
  icon: 'users' | 'book' | 'credit' | 'bed';
}

export interface DashboardData {
  stats: StatTile[];
  enrollment: EnrollmentPoint[];
  collections: CollectionsPoint[];
  activity: RecentActivityItem[];
  departments: DepartmentOverview[];
}
