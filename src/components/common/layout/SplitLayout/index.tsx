import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

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
  },
});

interface SplitLayoutProps
  extends PropsWithChildren,
    VariantProps<typeof SplitLayoutVariants> {
  sidebar: React.ReactNode;
}
export default function SplitLayout({
  children,
  sidebar,
  gridCols = 'default',
  gap = 'md',
}: SplitLayoutProps) {
  return (
    <div className={cn(SplitLayoutVariants({ gridCols, gap }))}>
      <div>{children}</div>
      <div>{sidebar}</div>
    </div>
  );
}
