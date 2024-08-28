import Link from 'next/link';
import React from 'react';
import Gap from '../../layout/Gap';

interface PostItemProps {
  title: string;
  content: string;
  date: string;
  href: string;
  image?: string;
}
export default function PostItem({
  content,
  date,
  href,
  title,
  image,
}: PostItemProps) {
  return (
    <Link href={href}>
      <article className="group cursor-pointer select-none rounded-lg transition w-full overflow-hidden shadow-sm hover:shadow-lg">
        <div
          className="bg-slate-100 w-[600] h-96 "
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="p-4 bg-white">
          <h4 className="text-xl font-bold">{title}</h4>
          <Gap size={2} />
          <p>{content}</p>
          <Gap size={12} />
          <div className="flex justify-between">
            <span className="opacity-70">{date}</span>
            <span className="font-semibold opacity-70 group-hover:opacity-100 transition">
              Read more &rarr;
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

PostItem.defaultProps = {
  image: '',
};
