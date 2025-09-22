import LeadsScreen from '@/features/leads/components/LeadsScreen';
import { getLeads } from '@/features/leads/api';

export default async function LeadsPage({ searchParams }: { searchParams: { page?: string; size?: string; q?: string } }) {
  const page = Math.max(1, Number(searchParams.page ?? '1'));
  const pageSize = Math.max(5, Number(searchParams.size ?? '10'));
  const q = searchParams.q ?? '';
  const { items: leads, total, totalPages } = await getLeads(page, pageSize, q);

  return (
    <LeadsScreen
      page={page}
      pageSize={pageSize}
      q={q}
      total={total}
      totalPages={totalPages}
      leads={leads}
    />
  );
}