import React from 'react';
import cn from '@/utils/cn';

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function P({
  children,
  className = '',
  ...rest
}: PProps): JSX.Element {
  return (
    <p className={cn('text-lg my-4 leading-relaxed', className)} {...rest}>
      {children}
    </p>
  );
}

P.defaultProps = {
  children: null,
  className: '',
};
