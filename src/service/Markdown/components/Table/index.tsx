import React from 'react';
import cn from '@/utils/cn';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Table({
  children,
  className = '',
  ...rest
}: TableProps): JSX.Element {
  return (
    <table className={cn('w-full my-4', className)} {...rest}>
      {children}
    </table>
  );
}

Table.defaultProps = {
  children: null,
  className: '',
};
