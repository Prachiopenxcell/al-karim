'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, Bell, Mail, Globe, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

export default function Header() {
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New admission request', time: '2m' },
    { id: 2, title: 'Fee payment received', time: '10m' },
    { id: 3, title: 'Schedule updated', time: '1h' },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, from: 'Dean Office', snippet: 'Meeting at 3 PM', time: '5m' },
    { id: 2, from: 'Accounts', snippet: 'Monthly report ready', time: '48m' },
  ]);

  const langMeta = {
    en: { label: 'English', flag: 'https://flagcdn.com/w20/us.png' },
    hi: { label: 'Hindi', flag: 'https://flagcdn.com/w20/in.png' },
  } as const;

  const markAllNotificationsRead = () => setNotifications([]);
  const markAllMessagesRead = () => setMessages([]);
  const logout = () => router.push('/login');

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-50 border-0 focus:bg-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const q = (e.target as HTMLInputElement).value;
                if (q.trim()) router.push(`/dashboard?search=${encodeURIComponent(q)}`);
              }
            }}
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Language selector */}
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

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-3 flex items-center justify-between">
              <p className="text-sm font-medium">Notifications</p>
              <Button variant="ghost" size="sm" onClick={markAllNotificationsRead}>Mark all read</Button>
            </div>
            <Separator />
            <div className="max-h-64 overflow-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500 p-4">You are all caught up.</p>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-900">{n.title}</p>
                    <p className="text-xs text-gray-500">{n.time} ago</p>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Messages */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Mail className="h-5 w-5" />
              {messages.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-emerald-600">
                  {messages.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-3 flex items-center justify-between">
              <p className="text-sm font-medium">Messages</p>
              <Button variant="ghost" size="sm" onClick={markAllMessagesRead}>Mark all read</Button>
            </div>
            <Separator />
            <div className="max-h-64 overflow-auto">
              {messages.length === 0 ? (
                <p className="text-sm text-gray-500 p-4">No unread messages.</p>
              ) : (
                messages.map(m => (
                  <div key={m.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-900">{m.from}</p>
                    <p className="text-xs text-gray-500">{m.snippet} · {m.time} ago</p>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

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