import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function DepartmentProgressRow({
  name,
  value,
  percent,
  tag,
}: {
  name: string;
  value: string;
  percent: number;
  tag: 'excellent' | 'good' | 'average';
}) {
  const tagClass =
    tag === 'excellent' ? 'bg-green-100 text-green-700' :
    tag === 'good' ? 'bg-blue-100 text-blue-700' :
    'bg-yellow-100 text-yellow-700';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-800">{name}</p>
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold">{value}</span>
          <Badge variant="secondary" className={tagClass}>{tag}</Badge>
        </div>
      </div>
      <Progress value={percent} />
    </div>
  );
}
