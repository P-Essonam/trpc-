'use client';
import { trpc } from '@/trpc/client';
import React from 'react'

const UserComponent = () => {
  const [data] = trpc.users.getUser.useSuspenseQuery();

  return <div>
    {
        <div>
            {data.firstName} {data.lastName} {data.email}
        </div>
    }
  </div>;
}

export default UserComponent