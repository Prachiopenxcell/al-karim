'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function HeaderMessages() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'Dean Office', snippet: 'Meeting at 3 PM', time: '5m' },
    { id: 2, from: 'Accounts', snippet: 'Monthly report ready', time: '48m' },
  ]);

  const markAllMessagesRead = () => setMessages([]);

  return (
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
  );
}
