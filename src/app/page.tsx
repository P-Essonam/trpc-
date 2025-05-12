import React from 'react'
import { HydrateClient, trpc } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import UserComponent from '@/features/user/components/user-component';

const page = async() => {

  void trpc.users.getUser.prefetch();

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserComponent />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default page