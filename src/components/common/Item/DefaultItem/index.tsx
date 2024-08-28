import { Post } from '@/types/post';
import Link from 'next/link';

interface DefaultItemProps extends Post {}
export default function DefaultItem({ content, data, slug }: DefaultItemProps) {
  return (
    <Link href={`/post/${slug}`}>
      <div
        className="w-[800px] h-[450px] rounded-lg hover:bg-black hover:bg-opacity-10 transition-all cursor-pointer"
        // style={{
        //   backgroundImage: `url(${data.thumbnail})`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        // }}
      >
        <p>{data.title}</p>
        <p>{content}</p>
      </div>
    </Link>
  );
}
