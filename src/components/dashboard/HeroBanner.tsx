import { ReactNode } from 'react';
import Link from 'next/link';

interface ActionLink {
  label: string;
  href: string;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function HeroBanner({
  title,
  subtitle,
  primary,
  secondary,
  moreSlot,
}: {
  title: string;
  subtitle?: string;
  primary?: ActionLink;
  secondary?: ActionLink;
  moreSlot?: ReactNode; // e.g., kebab button
}) {
  return (
    <div className="rounded-xl p-6 al-karim-gradient text-white">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle ? (
            <p className="text-white/90 mt-1">{subtitle}</p>
          ) : null}
        </div>
        <div className="hidden sm:flex items-center space-x-3">
          {primary ? (
            <Link
              href={primary.href}
              className="inline-flex items-center px-3 py-2 text-sm font-medium bg-white text-primary rounded-md hover:bg-white/90"
            >
              {primary.icon ? <span className="h-4 w-4 mr-2 inline-flex items-center">{primary.icon}</span> : null}
              {primary.label}
            </Link>
          ) : null}
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white/10 text-white hover:bg-white/20"
            >
              {secondary.icon ? <span className="h-4 w-4 mr-2 inline-flex items-center">{secondary.icon}</span> : null}
              {secondary.label}
            </Link>
          ) : null}
          {moreSlot}
        </div>
      </div>
    </div>
  );
}
