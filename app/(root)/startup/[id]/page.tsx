import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'

export const experimental_ppr = true;

const StartupPage = async ({ params}: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const postData = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    if (!postData) {
        notFound();
    }

  return (
    <div className='text-3xl'>{postData.title}</div>
  )
}

export default StartupPage;