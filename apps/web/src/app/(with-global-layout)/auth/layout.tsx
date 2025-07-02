import React, { Suspense } from 'react';
import PageContainer from 'src/components/layout/PageContainer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <section className="flex min-h-screen items-center justify-center">{children}</section>
      </Suspense>
    </PageContainer>
  );
}
