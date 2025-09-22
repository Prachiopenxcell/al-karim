import { Badge } from '@/components/ui/badge';

export interface RecentItemProps {
  name: string;
  tag: 'pending' | 'success' | 'processing';
  desc: string;
  time: string;
  amount: string;
}

export default function RecentActivityItem({ name, tag, desc, time, amount }: RecentItemProps) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  const tagClass =
    tag === 'success' ? 'bg-green-100 text-green-700' :
    tag === 'pending' ? 'bg-yellow-100 text-yellow-700' :
    'bg-blue-100 text-blue-700';

  return (
    <div className="py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <Badge variant="secondary" className={tagClass}>{tag}</Badge>
          </div>
          <p className="text-xs text-gray-500">{desc} · {time}</p>
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-900">{amount}</p>
    </div>
  );
}
