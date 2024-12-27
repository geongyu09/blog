import { getAllTags } from '@/lib/post/post';
import cn from '@/utils/cn';
import Link from 'next/link';
import Tag from '@/components/common/tag';

export default function TagsSection() {
  const tags = getAllTags();

  return (
    <section className="border h-96 rounded-lg p-4">
      <h3 className="text-lg font-bold">태그</h3>
      <ul className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <li
            key={`${tag}-${index * 2}`}
            className={cn('cursor-pointer', 'list-hover')}
          >
            <Link href={`?tag=${tag}`}>
              <Tag tag={tag} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
