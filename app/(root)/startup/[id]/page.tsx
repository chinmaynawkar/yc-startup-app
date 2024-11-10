/* eslint-disable @next/next/no-img-element */
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupDetails from '@/components/StartupDetails';
import EditorPicks from '@/components/EditorPicks';
import { EditorPicksSkeleton } from '@/components/StartupCardSkeleton';
import { StartupDetailsSkeleton } from '@/components/StartupCardSkeleton';

export const experimental_ppr = true;

const StartupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const postData = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!postData) {
    notFound();
  }

  return (
    <>
      <section className="pink_container !min-h[230px]">
        <p className="tag">{formatDate(postData?._createdAt)}</p>
        <h1 className="heading">{postData.title}</h1>
        <p className="sub-heading !max-w-5xl">{postData.description}</p>
      </section>

      <Suspense fallback={<StartupDetailsSkeleton />}>
        <StartupDetails data={postData} />
      </Suspense>

      <hr className="divider" />

      <Suspense fallback={<EditorPicksSkeleton />}>
        <EditorPicks slug="top-picks-of-the-month" />
      </Suspense>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
};

export default StartupPage;