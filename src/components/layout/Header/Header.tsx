'use client';

import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import HeaderSearch from './HeaderSearch';
import HeaderLocale from './HeaderLocale';
import HeaderNotifications from './HeaderNotifications';
import HeaderMessages from './HeaderMessages';

export default function Header() {
  const router = useRouter();
  const logout = () => router.push('/login');

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search */}
      <HeaderSearch />

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <HeaderLocale />
        <HeaderNotifications />
        <HeaderMessages />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  JD
                </div>
                <span className="text-sm font-medium">John</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex items-center gap-2"><User className="w-4 h-4" /> My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')} className="flex items-center gap-2">
              <User className="w-4 h-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="flex items-center gap-2">
              <Settings className="w-4 h-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600">
              <LogOut className="w-4 h-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}