'use client';
import { ROUTES } from '@/common/constants';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

export default function MovieList({ data }) {
  const [movieList, setMoviesList] = useState(data);
  return movieList?.movies?.data?.map((post) => (
    <Link href={`${ROUTES?.MOVIES}/${post?.id}`}>
      <article
        key={post?.id}
        className="flex max-w-xl flex-col items-start justify-between border border-solid border-grey p-3 border rounded cursor-pointer"
      >
        <div className="flex items-center gap-x-4 text-xs border-solid">
          <time dateTime={post?.releaseDate} className="text-gray-500">
            {dayjs(post?.releaseDate)?.format('DD-MM-YYYY')}
          </time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <span className="absolute inset-0" />
            {post?.title}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {post?.tagline}
          </p>
        </div>
      </article>
    </Link>
  ));
}
