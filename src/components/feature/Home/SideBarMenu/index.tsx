import { getAllTags } from '@/lib/post';
import cn from '@/utils/cn';
import Link from 'next/link';

export default function SideBarMenu() {
  const tags = getAllTags();

  return (
    <aside className="sticky top-10">
      <section className="border h-96 rounded-lg p-4">
        <h3 className="text-lg font-bold">태그</h3>
        <ul>
          {tags.map((tag, index) => (
            <li
              key={`${tag}-${index * 2}`}
              className={cn('cursor-pointer', 'list-hover')}
            >
              <Link href={`?tag=${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
