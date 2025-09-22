'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LeadsToolbar({ pageSize, q }: { pageSize: number; q: string }) {
  const router = useRouter();

  const onSizeChange = (value: string) => {
    const params = new URLSearchParams({ size: value, page: '1', q });
    router.push(`/dashboard/leads?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Select defaultValue={String(pageSize)} onValueChange={onSizeChange}>
          <SelectTrigger className="h-8 w-[90px] rounded-lg border-gray-300 text-sm focus:ring-1 focus:ring-primary/40">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent className="rounded-lg shadow-md border border-gray-200" align="start">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-600">entries per page</span>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const input = form.elements.namedItem('q') as HTMLInputElement;
            const params = new URLSearchParams({ size: String(pageSize), page: '1', q: input.value });
            router.push(`/dashboard/leads?${params.toString()}`);
          }}
          className="flex"
        >
          <Input name="q" defaultValue={q} placeholder="Search..." className="pl-10 w-64" />
          <button type="submit" className="hidden" aria-hidden="true" />
        </form>
      </div>
    </div>
  );
}
