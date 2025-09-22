"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerExtra?: React.ReactNode;
};

export function AuthCard({ title, description, children, className, headerExtra }: AuthCardProps) {
  return (
    <Card className={cn("shadow-xl border-0", className)}>
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
        {description ? (
          <CardDescription className="text-gray-600">{description}</CardDescription>
        ) : null}
        {headerExtra}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
