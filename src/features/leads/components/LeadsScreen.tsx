import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import BreadcrumbRow from '@/components/dashboard/BreadcrumbRow';
import DataTable from '@/components/data/DataTable';
import LeadsToolbar from '@/features/leads/components/LeadsToolbar';
import Link from 'next/link';
import type { Lead } from '@/features/leads/types';
import { Plus, Phone, Pencil, Trash2 } from 'lucide-react';

export type LeadsScreenProps = {
  page: number;
  pageSize: number;
  q: string;
  total: number;
  totalPages: number;
  leads: Lead[];
};

export default function LeadsScreen({ page, pageSize, q, total, totalPages, leads }: LeadsScreenProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <BreadcrumbRow items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Leads' }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-4">
        <Button className="al-karim-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
        <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
          <Phone className="h-4 w-4 mr-2" />
          Schedule Follow-Up Calls
        </Button>
      </div>

      {/* Leads Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-200">
            <LeadsToolbar pageSize={pageSize} q={q} />
          </div>

          <DataTable<Lead>
            className=""
            columns={[
              { key: 'id', header: '#', className: 'text-sm' },
              { key: 'name', header: 'Name', render: (lead) => (
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{lead.name}</span>
                </div>
              )},
              { key: 'counsellor', header: 'Assigne Counsellor', className: 'text-sm text-gray-600' },
              { key: 'lastUpdated', header: 'Last Updated', className: 'text-sm text-gray-600' },
              { key: 'source', header: 'Source', className: 'text-sm text-gray-600' },
              { key: 'mobile', header: 'Mobile', render: (l) => <span className="text-sm text-primary font-medium">{l.mobile}</span> },
              { key: 'email', header: 'Email', className: 'text-sm text-gray-600' },
              { key: 'status', header: 'Status', render: (l) => (
                <Badge variant="secondary" className="bg-orange-100 text-orange-600">{l.status}</Badge>
              )},
              { key: 'action', header: 'Action', render: (l) => (
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50" aria-label="Edit lead">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50" aria-label="Delete lead">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            ]}
            data={leads}
            footerLeft={<div className="text-sm text-gray-600">Total: {total} entries</div>}
            footerRight={
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled={page <= 1} asChild>
                  <Link href={`/dashboard/leads?page=${page - 1}&size=${pageSize}&q=${encodeURIComponent(q)}`}>Previous</Link>
                </Button>
                <Button size="sm" className="al-karim-gradient w-8 h-8" asChild>
                  <Link href={`/dashboard/leads?page=${page}&size=${pageSize}&q=${encodeURIComponent(q)}`}>{page}</Link>
                </Button>
                <Button variant="outline" size="sm" disabled={page >= totalPages} asChild>
                  <Link href={`/dashboard/leads?page=${page + 1}&size=${pageSize}&q=${encodeURIComponent(q)}`}>Next</Link>
                </Button>
              </div>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
