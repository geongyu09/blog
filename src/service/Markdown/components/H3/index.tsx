import React from 'react';
import cn from '@/utils/cn';
import headerUtil from '@/utils/contentHeader';
import Link from 'next/link';

interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H3({
  children,
  className = '',
  ...rest
}: H3Props): JSX.Element {
  const headerId = headerUtil.getHeaderHashText(children as string);
  return (
    <Link href={`#${headerId}`}>
      <h3
        id={headerId}
        className={cn(
          'text-2xl font-bold mt-12 mb-8',
          'hover:opacity-80',
          className,
        )}
        {...rest}
      >
        {children}
      </h3>
    </Link>
  );
}

H3.defaultProps = {
  children: null,
  className: '',
};
