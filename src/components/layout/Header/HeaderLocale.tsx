'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function HeaderLocale() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const langMeta = {
    en: { label: 'English', flag: 'https://flagcdn.com/w20/us.png' },
    hi: { label: 'Hindi', flag: 'https://flagcdn.com/w20/in.png' },
  } as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Image
            src={langMeta[language].flag}
            alt={langMeta[language].label}
            width={20}
            height={15}
            className="rounded-sm"
          />
          <span className="text-sm">{langMeta[language].label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-lg shadow-md border border-gray-200 p-1 min-w-[180px]">
        <DropdownMenuLabel className="text-xs text-gray-500 px-2 py-1.5">Choose language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center gap-2 text-sm px-2 py-1.5">
          <Image src={langMeta.en.flag} alt="English" width={20} height={15} className="rounded-sm" /> English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')} className="flex items-center gap-2 text-sm px-2 py-1.5">
          <Image src={langMeta.hi.flag} alt="Hindi" width={20} height={15} className="rounded-sm" /> Hindi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
