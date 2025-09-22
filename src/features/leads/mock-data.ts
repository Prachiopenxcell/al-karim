import type { LeadsResponse } from './types';

export const leadsMock: LeadsResponse = {
  items: Array.from({ length: 18 }).map((_, i) => ({
    id: i + 1,
    name: i % 3 === 0 ? 'Priya Sharma' : i % 3 === 1 ? 'Rahul Kumar' : 'Anita Patel',
    counsellor: i % 2 === 0 ? 'Kevin Marks' : 'Aarav Mehta',
    lastUpdated: '22 Feb 2024',
    source: i % 2 === 0 ? 'Website' : 'Walk-in',
    mobile: '9876543210',
    email: 'user@example.com',
    status: (['Pending', 'In Review', 'Converted'] as const)[i % 3],
  })),
  total: 18,
};
