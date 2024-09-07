import React from 'react';
import cn from '@/utils/cn';

interface AProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function A({
  children,
  className = '',
  ...rest
}: AProps): JSX.Element {
  return (
    <a className={cn('text-blue-500 underline', className)} {...rest}>
      {children}
    </a>
  );
}

A.defaultProps = {
  children: null,
  className: '',
};
