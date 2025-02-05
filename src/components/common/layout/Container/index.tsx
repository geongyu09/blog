import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

const ContainerVariants = cva('mx-auto max-w-6xl', {
  variants: {
    responsive: {
      none: '',
      default: 'px-4 lg:px-0',
    },
  },
});

interface ContainerProps
  extends PropsWithChildren,
    VariantProps<typeof ContainerVariants> {}

export default function Container({ responsive, children }: ContainerProps) {
  return (
    <div className={cn(ContainerVariants({ responsive }))}>{children}</div>
  );
}

Container.defaultProps = {
  styles: '',
};
