import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import NotificationList from 'src/features/notification/NotificationList';

interface NotificationPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
}

const NotificationPopover = ({ isOpen, onOpenChange, trigger }: NotificationPopoverProps) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => onOpenChange(false)} />}
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-80" align="end" side="bottom">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">알림</h3>
            </div>
            <NotificationList />
            <div className="border-t pt-2 text-center">
              <button className="text-(--color-warm-gray) text-sm">모든 알림 보기</button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationPopover;
