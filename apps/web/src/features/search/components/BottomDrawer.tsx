'use client';

import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@repo/ui/components/ui/drawer';

interface BottomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  footerNode?: React.ReactNode;
}

const BottomDrawer = ({ open, onOpenChange, children, title, description, footerNode }: BottomDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto w-full max-w-2xl">
        {title && <DrawerTitle className="sr-only">{title}</DrawerTitle>}
        {description && <DrawerDescription className="sr-only">{description}</DrawerDescription>}
        {children}
        {footerNode && <div className="p-4 pt-0">{footerNode}</div>}
      </DrawerContent>
    </Drawer>
  );
};
export default BottomDrawer;
