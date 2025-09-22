'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function Chart({ title, subtitle, className, children }: ChartProps) {
  return (
    <Card className={className ? className : 'shadow-md border-0 pb-4'}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {subtitle ? <p className="text-xs text-green-600 mt-1">{subtitle}</p> : null}
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}