import React from 'react';
import cn from '@/utils/cn';
import headerUtil from '@/utils/contentHeader';
import Link from 'next/link';

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H2({
  children,
  className = '',
  ...rest
}: H2Props): JSX.Element {
  const headerId = headerUtil.getHeaderHashText(children as string);
  return (
    <Link href={`#${headerId}`}>
      <h2
        id={headerId}
        className={cn(
          'text-2xl font-bold mt-12 mb-8',
          'hover:opacity-80',
          className,
        )}
        {...rest}
      >
        {children}
      </h2>
    </Link>
  );
}

H2.defaultProps = {
  children: null,
  className: '',
};
