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
    <div className="fixed top-64 right-0 w-64">
      <div className="relative">
        {/* Short TOC */}
        <div className="relative group">
          <div className="transition-all duration-300 ease-in-out">
            <ShortTableOfContent content={content} />
          </div>

          {/* Full TOC */}
          <div className="absolute top-0 right-0 w-full transition-all duration-300 ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible">
            <MarkdownNav
              markdown={content}
              className="bg-white rounded-xl border p-4 shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
