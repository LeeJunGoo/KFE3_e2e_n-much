import React, { ReactNode } from 'react';
// import TabBar from 'src/widgets/TabBar';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>{children}</div>
      {/* <TabBar /> */}
    </>
  );
};

export default layout;
