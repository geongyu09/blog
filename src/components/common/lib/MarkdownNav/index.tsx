import React from 'react';
import cn from '@/utils/cn';
import Link from 'next/link';
import { parseMarkdown } from '@/lib/markdown';
import Gap from '@/components/common/layout/Gap';
import headerUtil from '@/utils/header';

interface MarkdownNavProps {
  markdown: string;
}

export default function MarkdownNav({ markdown }: MarkdownNavProps) {
  const headers = parseMarkdown(markdown);

  return (
    <nav className="border-b py-2 px-4">
      <p className="text-base font-semibold">Content of this post</p>

      <Gap size={2} />

      <div className="px-2 flex flex-col gap-1">
        {headers.map(({ text, level }, index) => (
          <Link
            key={`${text}-${level}-${index * 2}`}
            href={`#${headerUtil.getHeaderHashText(text)}`}
          >
            <p
              className={cn(
                'cursor-pointer transition-colors duration-200 text-sm text-zinc-400',
                'hover:text-blue-500 hover:underline',
                {
                  'ml-0': level === 1,
                  'ml-6': level === 2,
                  'ml-12': level === 3,
                },
              )}
            >
              {text}
            </p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
