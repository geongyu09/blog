import React from 'react';
import cn from '@/utils/cn';

interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Blockquote({
  children,
  className = '',
  ...rest
}: BlockquoteProps): JSX.Element {
  return (
    <blockquote
      className={cn(
        'border-l-4 border-gray-300 my-12 bg-slate-100 py-2 px-8 rounded-md',
        className,
      )}
      {...rest}
    >
      {children}
    </blockquote>
  );
}

Blockquote.defaultProps = {
  children: null,
  className: '',
};
