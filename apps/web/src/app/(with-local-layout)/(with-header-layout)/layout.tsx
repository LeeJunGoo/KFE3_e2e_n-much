import React, { ReactNode } from 'react';
import Header from 'src/components/layout/Header';

const HeaderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default HeaderLayout;
