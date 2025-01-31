import Gap from '@/components/common/layout/Gap';
import { getImagePath } from '@/utils/image';
import Link from 'next/link';

interface DefaultItemProps {
  title: string;
  description: string;
  date: string;
  href: string;
  image: string;
}

export default function DefaultItem({
  date,
  description,
  href,
  title,
  image,
}: DefaultItemProps) {
  return (
    <Link href={href}>
      <article className="group cursor-pointer select-none rounded-lg transition w-full overflow-hidden border border-gray-200 hover:bg-slate-50 p-4">
        <div className="flex justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold">{title}</h4>
            <Gap size={2} />
            <p>{description}</p>
            <Gap size={4} />
            <span className="opacity-70">{date}</span>
          </div>

          <div
            className="rounded-lg border w-40 h-24 shrink-0"
            style={{
              backgroundImage: `url(${getImagePath(image)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        {/* <Gap size={8} /> */}
        {/* <span className="opacity-70">{date}</span> */}
      </article>
    </Link>
  );
}
