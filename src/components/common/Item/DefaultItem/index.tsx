import Link from 'next/link';
import Gap from '@/components/common/layout/Gap';

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
        <div className="grid grid-cols-[1fr_200px] gap-4">
          <div>
            <h4 className="text-xl font-bold">{title}</h4>
            <Gap size={2} />
            <p>{description}</p>
          </div>

          <div
            className="rounded-lg"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <Gap size={8} />
        <span className="opacity-70">{date}</span>
      </article>
    </Link>
  );
}
