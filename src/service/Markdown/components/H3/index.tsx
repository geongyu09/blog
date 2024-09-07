import React from 'react';
import cn from '@/utils/cn';

interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H3({
  children,
  className = '',
  ...rest
}: H3Props): JSX.Element {
  return (
    <h3 className={cn('text-2xl font-bold mt-12 mb-8', className)} {...rest}>
      {children}
    </h3>
  );
}

H3.defaultProps = {
  children: null,
  className: '',
};
