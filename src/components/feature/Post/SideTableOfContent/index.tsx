'use client';

import MarkdownNav from '@/components/common/lib/MarkdownNav';
import ShortTableOfContent from '@/components/common/lib/ShortTableOfContent';
import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const SideTabOfContentVariants = cva('fixed top-64 right-0 w-64', {
  variants: {
    responsive: {
      none: '',
      default: 'hidden lg:block',
      hide: 'hidden lg:block',
    },
  },
});

interface SideTableOfContentProps
  extends VariantProps<typeof SideTabOfContentVariants> {
  content: string;
}

export default function SideTableOfContent({
  content,
  responsive = 'default',
}: SideTableOfContentProps) {
  return (
    <div className={cn(SideTabOfContentVariants({ responsive }))}>
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
              className="bg-white rounded-xl border p-4 shadow-md max-h-96 overflow-y-auto scrollbar-hidden overscroll-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
