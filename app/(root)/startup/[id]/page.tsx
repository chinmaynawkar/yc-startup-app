import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import Image from 'next/image';
import markdownIt from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
export const experimental_ppr = true;

const md = markdownIt();
const StartupPage = async ({ params}: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const postData = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    if (!postData) {
        notFound();
    }

    const parsedPitch = md.render(postData?.pitch || '');

  return (
    <>
      <section className='pink_container !min-h[230px]'>
        <p className='tag'>{formatDate(postData?._createdAt)}</p>
        <h1 className='heading'>{postData.title}</h1>
        <p className='sub-heading !max-w-5xl'>{postData.description}</p>
      </section>

      <section className='section_container'>
        <img
        src={postData.image}
        alt='thumbnail'
        className='w-full h-auto object-cover rounded-xl'
        />

        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link href={`/user/${postData.author?._id}`} className='flex gap-2 items-center mb-3'>
            <Image
              src={postData.author?.image}
              alt={postData.author?.name}
              width={64}
              height={64}
              className='rounded-full aspect-square object-cover drop-shadow-lg'
            />
           
            <div>
              <p className='text-20-medium'>{postData.author?.name}</p>
              <p className='text-16-regular !text-black-300'>
              @{postData.author?.username}
              </p>
            </div>
          </Link>

          <p className='category-tag'>{postData.category}</p>
          </div>

          <h3 className='text-30-bold'> Pitch Details</h3>
          {parsedPitch ? (
            <article className='prose max-w-4xl font-work-sans break-all' dangerouslySetInnerHTML={{ __html: parsedPitch }} />
          ) : (
            <p className='no-result'>No pitch details available</p>
          )}
        </div>

        <hr className='divider' />

        {/* TODO: EDITOR SELECTED STARTUPS */}

        {/* Whenever you want to make something dynamic in Partial Pre Rendering, we have to wrap it in Suspense */}
        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  )
}

export default StartupPage;