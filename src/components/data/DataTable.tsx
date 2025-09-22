import { ReactNode } from 'react';

export interface Column<T> {
  key: keyof T | string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
  className?: string;
}

export default function DataTable<T>({ columns, data, footerLeft, footerRight, className }: DataTableProps<T>) {
  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-600">
              {columns.map((c, i) => (
                <th key={i} className={`p-4 font-medium ${c.className ?? ''}`}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                {columns.map((c, ci) => (
                  <td key={ci} className={`p-4 ${c.className ?? ''}`}>
                    {c.render ? c.render(row) : String((row as any)[c.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(footerLeft || footerRight) && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div>{footerLeft}</div>
          <div>{footerRight}</div>
        </div>
      )}
    </div>
  );
}
