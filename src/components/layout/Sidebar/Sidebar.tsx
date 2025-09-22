'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { 
  Home, 
  Users, 
  UserCheck, 
  Building, 
  GraduationCap, 
  FileText, 
  BookOpen, 
  ClipboardList, 
  User, 
  Calendar, 
  Shield, 
  ChevronRight, 
  Menu, 
  X,
  LogOut,
  Microscope,
  Heart,
  Activity,
  UserPlus,
  DollarSign,
  Trophy,
  Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: ClipboardList, label: 'Leads', href: '/dashboard/leads' },
  { icon: UserPlus, label: 'Admissions', href: '/dashboard/admissions' },
  { icon: Users, label: 'Students', href: '/dashboard/students' },
  { icon: GraduationCap, label: 'Faculty', href: '/dashboard/faculty' },
  { icon: BookOpen, label: 'Academics', href: '/dashboard/academics' },
  { icon: FileText, label: 'Examinations', href: '/dashboard/examinations' },
  { icon: DollarSign, label: 'Fee Management', href: '/dashboard/fees' },
  { icon: Building, label: 'Hostel', href: '/dashboard/hostel' },
  { icon: Microscope, label: 'Research', href: '/dashboard/research' },
  { icon: Heart, label: 'Clinical Training', href: '/dashboard/clinical' },
  { icon: Activity, label: 'Internships', href: '/dashboard/internships' },
  { icon: Trophy, label: 'Sports', href: '/dashboard/sports' },
  { icon: Users2, label: 'Alumni', href: '/dashboard/alumni' },
  { icon: Calendar, label: 'Timetable', href: '/dashboard/timetable' },
  { icon: Shield, label: 'Security', href: '/dashboard/security' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Keep a CSS variable updated so the main layout can respond to sidebar width
  useEffect(() => {
    const width = isCollapsed ? '5rem' : '16rem';
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--sidebar-width', width);
    }
  }, [isCollapsed]);

  const handleSignOut = () => {
    // Add sign out logic here
    router.push('/login');
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col overflow-x-hidden',
          'md:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 al-karim-gradient flex-shrink-0">
          <div className="flex items-center gap-3">
            {isCollapsed ? (
              <div className="bg-white p-2.5 rounded-xl shadow-sm ring-1 ring-black/5">
                <Image src="/images/icon.svg" alt="Al karim" width={36} height={36} />
              </div>
            ) : (
              <Image
                src="/images/logo.svg"
                alt="Al karim"
                width={148}
                height={36}
                className="block max-h-9 w-auto"
                priority
              />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 hidden md:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronRight className={cn('h-4 w-4 transition-transform', isCollapsed ? 'rotate-0' : 'rotate-180')} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden sidebar-scroll">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center py-3 text-sm font-medium rounded-lg transition-colors group relative',
                  'hover:bg-gray-100',
                  isActive && 'sidebar-active text-primary font-semibold',
                  !isActive && 'text-gray-600 hover:text-gray-900',
                  isCollapsed ? 'justify-center px-0' : 'justify-start px-3'
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Sign Out */}
        <div className="border-t border-gray-200 p-4 flex-shrink-0">
          {/* User Profile */}
          <div className={cn(
            'flex items-center mb-4',
            isCollapsed ? 'justify-center' : 'space-x-3'
          )}>
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Dr. Johnathan Doe</p>
                <p className="text-xs text-gray-500 truncate">Dean of Medicine</p>
              </div>
            )}
          </div>

          {/* Sign Out Button */}
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className={cn(
              'w-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors',
              isCollapsed ? 'px-0 justify-center' : 'justify-start'
            )}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Sign Out</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}