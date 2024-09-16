'use client';

import MarkdownNav from '@/components/common/lib/MarkdownNav';
import ShortTableOfContent from '@/components/common/lib/ShortTableOfContent';
import { useState } from 'react';

interface SideTableOfContentProps {
  content: string;
}
export default function SideTableOfContent({
  content,
}: SideTableOfContentProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="fixed top-64 right-0 h-fit flex flex-col items-end gap-2 pr-2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ShortTableOfContent content={content} />

      {isHover && (
        <div className="fixed top-60 right-0 h-fit flex flex-col gap-2 pr-2">
          <MarkdownNav
            markdown={content}
            className="bg-white rounded-xl border p-4 shadow-md"
          />
        </div>
      )}
    </div>
  );
}
