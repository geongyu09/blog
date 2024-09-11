import React from 'react';
import cn from '@/utils/cn';
import './styled.css';

export type QuoteStyle = 'default' | 'info' | 'warning' | 'success' | 'error';

const styleClasses: Record<QuoteStyle, string> = {
  default: 'border-gray-300 bg-slate-100',
  info: 'border-blue-300 bg-blue-50',
  warning: 'border-yellow-300 bg-yellow-50',
  success: 'border-green-300 bg-green-50',
  error: 'border-red-300 bg-red-50',
};

interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  node: Element | undefined;
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export default function Blockquote({
  node,
  children,
  className = '',
  ...rest
}: BlockquoteProps): JSX.Element {
  if (!node) return <div />;

  const quoteStyleType = (node.children[1].children[0] as any).value?.split(
    '\n',
  )[0];
  let styleType: QuoteStyle = 'default';

  if (quoteStyleType === '🍀') styleType = 'success';
  if (quoteStyleType === '⚠️' || quoteStyleType === '❗️') styleType = 'warning';
  if (quoteStyleType === '❌') styleType = 'error';
  if (quoteStyleType === '💡') styleType = 'info';

  return (
    <blockquote
      className={cn(
        'border-l-4 border-gray-300 my-12 bg-slate-100 px-8 py-2 rounded-md whitespace-pre-wrap',
        'flex gap-8 items-center',
        'blockquote',
        className,
        { [styleClasses[styleType]]: styleType !== 'default' },
      )}
      {...rest}
    >
      {styleType !== 'default' &&
        children &&
        children instanceof Array &&
        children.map((childrenText, index) => {
          const isEmptyString = childrenText === '\n' || childrenText === '';

          if (!isEmptyString)
            return (
              <div
                key={`${index * 2}-${childrenText}`}
                className="first:text-2xl"
              >
                {childrenText}
              </div>
            );
          return null;
        })}
      {styleType === 'default' && children}
    </blockquote>
  );
}

Blockquote.defaultProps = {
  children: null,
  className: '',
};
