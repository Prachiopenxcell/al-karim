'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function HeaderSearch() {
  const router = useRouter();
  return (
    <div className="flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search..."
          className="pl-10 bg-gray-50 border-0 focus:bg-white"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const q = (e.target as HTMLInputElement).value;
              if (q.trim()) router.push(`/dashboard?search=${encodeURIComponent(q)}`);
            }
          }}
        />
      </div>
    </div>
  );
}
