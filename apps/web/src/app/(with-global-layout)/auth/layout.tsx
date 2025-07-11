import { ReactNode } from 'react';
import PageContainer from 'src/shared/ui/PageContainer';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <PageContainer className="flex h-screen w-full items-center justify-center py-0 text-center">
      {children}
    </PageContainer>
  );
};

export default layout;
