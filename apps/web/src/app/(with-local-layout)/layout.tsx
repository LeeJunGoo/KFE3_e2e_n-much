import type { ReactNode } from 'react';
import MobileNavigation from 'src/widgets/layout/MobileNavigation';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <MobileNavigation />
    </>
  );
};

export default layout;
