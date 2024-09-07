import React from 'react';
import cn from '@/utils/cn';

interface TdProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Td({
  children,
  className = '',
  ...rest
}: TdProps): JSX.Element {
  return (
    <td className={cn('text-lg', className)} {...rest}>
      {children}
    </td>
  );
}

Td.defaultProps = {
  children: null,
  className: '',
};
