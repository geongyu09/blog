import Link from 'next/link';
import Gap from '../layout/Gap';

interface EmbedProps {
  title: string;
  description: string;
  image?: string;
  href?: string;
}

export default function Embed({ description, image, title, href }: EmbedProps) {
  return (
    <Link
      href={href ?? ''}
      className="border grid grid-cols-[1fr_1.2fr] rounded-sm"
    >
      <div className="px-4 py-12">
        <h2 className="text-xl">{title}</h2>
        <Gap size={6} />
        <p className="opacity-70">{description}</p>
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
};
