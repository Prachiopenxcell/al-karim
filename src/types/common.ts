export type MonthKey =
  | 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun'
  | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec';

export interface ApiPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
