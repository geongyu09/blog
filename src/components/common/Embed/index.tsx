import Link from 'next/link';
import Gap from '../layout/Gap';

interface EmbedProps {
  href?: string;

  title: string;
  description: string;
  date?: string;

  image?: string;
}

export default function Embed({
  description,
  image,
  title,
  href,
  date,
}: EmbedProps) {
  return (
    <Link
      href={href ?? ''}
      className="border sm:grid sm:grid-cols-[1fr_1.2fr] rounded-sm"
    >
      <div className="px-4 py-12">
        <h2 className="text-xl">{title}</h2>
        <Gap size={6} />
        <p className="opacity-70">{description}</p>
        <Gap size={6} />
        <p className="text-xs text-slate-500">{date}</p>
      </div>
      <div
        className="bg-slate-100"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Link>
  );
}

Embed.defaultProps = {
  image: '',
  href: '/',
  date: '',
};
