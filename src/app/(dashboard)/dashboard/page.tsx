import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EnrollmentLineChart, FinancialAreaChart } from '@/components/dashboard/RechartsBlocks';
import Chart from '@/components/dashboard/Chart';
import BreadcrumbRow from '@/components/dashboard/BreadcrumbRow';
import HeroBanner from '@/components/dashboard/HeroBanner';
import RecentActivityItem from '@/components/dashboard/RecentActivityItem';
import { getDashboardData } from '@/features/dashboard/api';
import type { StatTile } from '@/features/dashboard/types';
import DepartmentProgressRow from '@/components/dashboard/DepartmentProgressRow';
import {
  Users,
  BookOpen,
  CreditCard,
  Bed,
  Plus,
  Send,
  TrendingUp,
  TrendingDown,
  Home,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';

export default async function DashboardPage() {
  const data = await getDashboardData();
  const recentActivity = data.activity;
  const departments = data.departments;
  const stats = data.stats;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <BreadcrumbRow items={[{ label: 'Dashboard' }]} />

      {/* Hero */}
      <HeroBanner
        title="Welcome back, Admin!"
        subtitle="Here&apos;s what's happening at Al Karim University today."
        primary={{ label: 'Add Student', href: '#', icon: <Plus className='h-4 w-4' /> }}
        secondary={{ label: 'Send Notice', href: '#', icon: <Send className='h-4 w-4' />, variant: 'secondary' }}
        moreSlot={<Button size="icon" variant="secondary" className="bg-white/10 text-white hover:bg-white/20"><MoreHorizontal className="w-4 h-4" /></Button>}
      />

      {/* Stat Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s: StatTile, idx: number) => {
          const iconMap = { users: Users, book: BookOpen, credit: CreditCard, bed: Bed } as const;
          const Icon = iconMap[s.icon];
          const colorMap: Record<string, { color: string; bg: string }> = {
            users: { color: 'text-blue-600', bg: 'bg-blue-50' },
            book: { color: 'text-green-600', bg: 'bg-green-50' },
            credit: { color: 'text-indigo-600', bg: 'bg-indigo-50' },
            bed: { color: 'text-orange-600', bg: 'bg-orange-50' },
          };
          const colors = colorMap[s.icon] ?? { color: 'text-gray-600', bg: 'bg-gray-50' };
          return (
          <Card key={idx} className="shadow-sm border-0">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{s.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {s.direction === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={s.direction === 'up' ? 'text-xs text-emerald-600' : 'text-xs text-red-600'}>
                      {s.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <Icon className={`w-5 h-5 ${colors.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );})}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Chart title="Student Enrollment Trend" subtitle="Last 12 months · +15.2%">
          <div className="w-full h-64 bg-gray-50 rounded-lg p-2 pb-6">
            <EnrollmentLineChart data={data.enrollment} />
          </div>
        </Chart>

        <Chart title="Financial Overview" subtitle="Last 12 months · +16.2%">
          <div className="w-full h-64 bg-gray-50 rounded-lg p-2 pb-6">
            <FinancialAreaChart data={data.collections} />
          </div>
        </Chart>
      </div>

      {/* Recent Activity + Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="shadow-md border-0 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {recentActivity.map((a, i) => (
                <RecentActivityItem key={i} {...a} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Department Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departments.map((d) => (
              <DepartmentProgressRow key={d.name} {...d} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}