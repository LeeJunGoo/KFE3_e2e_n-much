import type { ReactNode } from 'react';
import React from 'react';
// import TabBar from 'src/widgets/Tabar';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>{children}</div>
      {/* <TabBar /> */}
    </>
  );
};

export default layout;
