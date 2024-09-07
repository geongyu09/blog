import React from 'react';
import cn from '@/utils/cn';

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H2({
  children,
  className = '',
  ...rest
}: H2Props): JSX.Element {
  return (
    <h2 className={cn('text-2xl font-bold mt-12 mb-8', className)} {...rest}>
      {children}
    </h2>
  );
}

H2.defaultProps = {
  children: null,
  className: '',
};
