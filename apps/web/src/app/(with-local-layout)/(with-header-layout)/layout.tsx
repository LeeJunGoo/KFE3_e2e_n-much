import type { ReactNode } from 'react';
import React from 'react';
import Header from 'src/widgets/layout/Header';

const HeaderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default HeaderLayout;
