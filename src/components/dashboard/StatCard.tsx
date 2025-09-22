import { cn } from '@/lib/utils';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  variant: 'green' | 'orange' | 'blue' | 'pink';
}

export default function StatCard({ title, value, change, icon: Icon, variant }: StatCardProps) {
  const variantClasses = {
    green: 'stat-card-green',
    orange: 'stat-card-orange', 
    blue: 'stat-card-blue',
    pink: 'stat-card-pink'
  };

  return (
    <div className={cn('p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow', variantClasses[variant])}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/90 text-sm font-medium">{title}</h3>
        <div className="p-3 bg-white/20 rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-white/90 text-sm">{change}</p>
      </div>
    </div>
  );
}