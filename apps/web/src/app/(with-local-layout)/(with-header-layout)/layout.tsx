import React, { ReactNode } from 'react';
import Header from 'src/widgets/Header';

const HeaderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default HeaderLayout;
