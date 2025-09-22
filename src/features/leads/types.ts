export interface Lead {
  id: number;
  name: string;
  counsellor: string;
  lastUpdated: string;
  source: string;
  mobile: string;
  email: string;
  status: 'Pending' | 'In Review' | 'Converted' | 'Lost';
}

import type { ApiPagination } from '@/types/common';

export interface LeadsResponse extends ApiPagination {
  items: Lead[];
  q?: string;
}
