import { getDashboardData } from '@/features/dashboard/api';
import DashboardScreen from '@/features/dashboard/components/DashboardScreen';

export default async function DashboardPage() {
  const data = await getDashboardData();
  return (
    <DashboardScreen
      stats={data.stats}
      enrollment={data.enrollment}
      collections={data.collections}
      activity={data.activity}
      departments={data.departments}
    />
  );
}