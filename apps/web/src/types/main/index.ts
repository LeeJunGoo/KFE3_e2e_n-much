export interface TabMenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  type: 'link' | 'button';
  onClick?: () => void;
}
