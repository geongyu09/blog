import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

const SplitLayoutVariants = cva(`grid`, {
  variants: {
    gridCols: {
      default: 'grid-cols-[10fr,5fr]',
    },
    gap: {
      md: 'gap-4',
      lg: 'gap-16',
      xl: 'gap-28',
    },
    responsive: {
      none: '',
      default: 'grid-cols-1 lg:grid-cols-[10fr,5fr]',
      reverse: 'grid-cols-1 lg:grid-cols-[10fr,5fr]',
    },
    responsiveGap: {
      none: '',
      md: 'gap-0 lg:gap-4',
      lg: 'gap-8 lg:gap-16',
      xl: 'gap-12 lg:gap-28',
    },
  },
});

interface SplitLayoutProps
  extends PropsWithChildren,
    VariantProps<typeof SplitLayoutVariants> {
  sidebar: React.ReactNode;
  styles?: string;
}
export default function SplitLayout({
  children,
  sidebar,
  gridCols = 'default',
  gap = 'md',
  styles,
  responsive,
  responsiveGap,
}: SplitLayoutProps) {
  return (
    <div
      className={cn(
        SplitLayoutVariants({ gridCols, gap, responsive, responsiveGap }),
        styles,
      )}
    >
      <div className={responsive === 'reverse' ? 'order-2 lg:order-none' : ''}>
        {children}
      </div>
      <div className={responsive === 'reverse' ? 'order-1 lg:order-none' : ''}>
        {sidebar}
      </div>
    </div>
  );
}

SplitLayout.defaultProps = {
  styles: '',
};
