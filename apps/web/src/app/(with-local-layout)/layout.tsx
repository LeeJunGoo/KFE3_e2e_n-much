import React, { ReactNode } from 'react';
import TabBar from 'src/components/layout/TabBar';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>{children}</div>
      <TabBar />
    </>
  );
};

export default layout;
