import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface CrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export default function BreadcrumbRow({ items }: { items: CrumbItem[] }) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500">
      <Home className="w-4 h-4" />
      {items.map((it, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {it.href ? (
            <Link href={it.href} className="hover:text-gray-700">
              {it.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{it.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
