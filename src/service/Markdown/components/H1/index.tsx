import React from 'react';
import cn from '@/utils/cn';

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H1({
  children,
  className = '',
  ...rest
}: H1Props): JSX.Element {
  console.log(children);
  return (
    <h1 className={cn('text-3xl font-bold mt-12 mb-8', className)} {...rest}>
      {children}
    </h1>
  );
}

H1.defaultProps = {
  children: null,
  className: '',
};
