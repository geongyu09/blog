import React from 'react';
import cn from '@/utils/cn';

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Pre({
  children,
  className = '',
  ...rest
}: PreProps): JSX.Element {
  return (
    <pre className={cn('my-4 rounded-lg overflow-hidden', className)} {...rest}>
      <div className="rounded-lg !p-8 !text-base">{children}</div>
    </pre>
  );
}

Pre.defaultProps = {
  children: null,
  className: '',
};
