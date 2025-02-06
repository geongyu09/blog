import cn from '@/utils/cn';
import React from 'react';

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
    <li
      className={cn('text-lg my-2 ml-5 marker:m-0 marker:p-0', className)}
      {...rest}
    >
      {children}
    </li>
  );
}

Li.defaultProps = {
  children: null,
  className: '',
};
