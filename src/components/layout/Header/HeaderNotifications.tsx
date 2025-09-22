'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function HeaderNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New admission request', time: '2m' },
    { id: 2, title: 'Fee payment received', time: '10m' },
    { id: 3, title: 'Schedule updated', time: '1h' },
  ]);

  const markAllNotificationsRead = () => setNotifications([]);

  return (
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
  );
}
