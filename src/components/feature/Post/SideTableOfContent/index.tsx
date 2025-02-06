'use client';

import HoverToShow from '@/components/common/interaction/HoverToShow';
import SideFixedPositioner, {
  SideFixedPositionerVariants,
} from '@/components/common/layout/SideFixedPositioner';
import MarkdownNav from '@/components/common/lib/MarkdownNav';
import ShortTableOfContent from '@/components/common/lib/ShortTableOfContent';
import { VariantProps } from 'class-variance-authority';

interface SideTableOfContentProps {
  content: string;
  responsive?: VariantProps<typeof SideFixedPositionerVariants>['responsive'];
}

export default function SideTableOfContent({
  content,
  responsive = 'default',
}: SideTableOfContentProps) {
  return (
    <SideFixedPositioner responsive={responsive}>
      <HoverToShow
        nonHoverComponent={<ShortTableOfContent content={content} />}
        hoverComponent={
          <MarkdownNav
            markdown={content}
            className="bg-white rounded-xl border p-4 shadow-md max-h-96 overflow-y-auto scrollbar-hidden overscroll-contain"
          />
        }
      />
    </SideFixedPositioner>
  );
}

SideTableOfContent.defaultProps = {
  responsive: 'default',
};
