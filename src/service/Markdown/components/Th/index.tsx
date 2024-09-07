import React from 'react';
import cn from '@/utils/cn';

interface ThProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Th({
  children,
  className = '',
  ...rest
}: ThProps): JSX.Element {
  return (
    <th className={cn('text-lg font-bold', className)} {...rest}>
      {children}
    </th>
  );
}

Th.defaultProps = {
  children: null,
  className: '',
};
