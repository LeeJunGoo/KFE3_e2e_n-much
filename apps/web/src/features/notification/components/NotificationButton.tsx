'use client';
import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { IoNotifications } from 'react-icons/io5';
import NotificationPopover from 'src/features/notification/components/NotificationPopover';

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  //NOTE - 임시적으로 알림이 없다고 가정
  const hasUnread = false;
  return (
    <div className="flex items-center">
      <NotificationPopover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button variant="text" className="relative !p-0">
            <IoNotifications className="text-(--color-accent) size-6" />
            {hasUnread && <span className="bg-(--color-red) absolute right-0.5 top-1.5 size-2 rounded-full" />}
          </Button>
        }
      />
    </div>
  );
};

export default NotificationButton;
