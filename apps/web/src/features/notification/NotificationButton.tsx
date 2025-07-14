import { Button } from '@repo/ui/components/ui/button';
import { IoNotifications } from 'react-icons/io5';

const NotificationButton = () => {
  return (
    <div className="flex items-center">
      <Button variant="text" className="relative !p-0">
        <IoNotifications className="text-(--color-accent) size-6" />
        <span className="bg-(--color-red) absolute right-0.5 top-1.5 size-2 rounded-full" />
      </Button>
    </div>
  );
};

export default NotificationButton;
