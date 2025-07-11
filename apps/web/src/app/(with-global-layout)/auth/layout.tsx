import React, { Suspense } from 'react';
import PageContainer from 'src/shared/ui/PageContainer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <section className="flex min-h-screen items-center justify-center">{children}</section>
      </Suspense>
    </PageContainer>
  );
}
