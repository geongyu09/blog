import React from 'react';
import cn from '@/utils/cn';

interface LiProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Li({
  children,
  className = '',
  ...rest
}: LiProps): JSX.Element {
  return (
    <li className={cn('text-lg my-2', className)} {...rest}>
      {children}
    </li>
  );
}

Li.defaultProps = {
  children: null,
  className: '',
};
