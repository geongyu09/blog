'use client';

import MarkdownNav from '@/components/common/lib/MarkdownNav';
import ShortTableOfContent from '@/components/common/lib/ShortTableOfContent';

interface SideTableOfContentProps {
  content: string;
}

export default function SideTableOfContent({
  content,
}: SideTableOfContentProps) {
  return (
    <div className="fixed top-64 right-0 h-fit flex flex-col items-end gap-2 pr-2 group">
      <div className="transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0">
        <ShortTableOfContent content={content} />
      </div>

      <div className="transition-all duration-180 ease-in-out fixed top-60 h-fit opacity-0 group-hover:opacity-100 ">
        <MarkdownNav
          markdown={content}
          className="bg-white rounded-xl border p-4 shadow-md"
        />
      </div>
    </div>
  );
}
