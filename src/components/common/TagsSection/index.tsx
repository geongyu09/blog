import { getAllTags } from '@/lib/post/post';
import cn from '@/utils/cn';
import Link from 'next/link';
import Tag from '@/components/common/tag';
import ROUTE_PATH from '@/constants/path/routePath';

export default function TagsSection() {
  const tags = getAllTags();

  return (
    <section className="border rounded-lg p-4">
      <h3 className="text-lg font-bold">태그</h3>
      <ul className="flex flex-wrap gap-1 mt-2">
        {tags.map((tag, index) => (
          <li
            key={`${tag}-${index * 2}`}
            className={cn('cursor-pointer mt-2', 'list-hover')}
          >
            <Link href={ROUTE_PATH.POSTS({ tag })}>
              <Tag tag={tag} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
