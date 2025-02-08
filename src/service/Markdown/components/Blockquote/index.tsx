import cn from '@/utils/cn';
import React from 'react';

import './styled.css'; // 적용이 안됨

export type QuoteStyle = 'default' | 'info' | 'warning' | 'success' | 'error';

const styleClasses: Record<QuoteStyle, string> = {
  default: 'border-gray-300 bg-slate-100 px-8',
  info: 'border-blue-300 bg-blue-50 flex px-8 gap-8 items-center',
  warning: 'border-yellow-300 bg-yellow-50 flex px-8 gap-8 items-center',
  success: 'border-green-300 bg-green-50 flex px-8 gap-8 items-center',
  error: 'border-red-300 bg-red-50 flex px-8 gap-8 items-center',
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

  const contents = (node.children[1].children[0] as any).value?.split('\n');

  let styleType: QuoteStyle = 'default';

  if (!contents) styleType = 'default';
  if (contents?.[0] === '🍀') styleType = 'success';
  if (contents?.[0] === '⚠️' || contents?.[0] === '❗️') styleType = 'warning';
  if (contents?.[0] === '❌') styleType = 'error';
  if (contents?.[0] === '💡') styleType = 'info';

  return (
    <blockquote
      className={cn(
        'border-l-4 border-gray-300 my-12 bg-slate-100 py-2 rounded-md whitespace-pre-wrap',
        'blockquote',
        styleClasses[styleType],
        className,
      )}
      {...rest}
    >
      {children instanceof Array &&
        children.map((childrenText, index) => {
          const isEmptyString = childrenText === '\n' || childrenText === '';

          return (
            !isEmptyString && (
              <div
                key={`${index * 2}-${childrenText}`}
                className="flex items-center"
              >
                {styleType !== 'default' && index === 1 ? (
                  <div className="mark">{childrenText}</div>
                ) : (
                  <div
                    key={`${index * 2}-${childrenText}`}
                    className={cn('text-lg', {
                      'text-xl': index === 0,
                    })}
                  >
                    {childrenText}
                  </div>
                )}
              </div>
            )
          );
        })}
    </blockquote>
  );
}

Blockquote.defaultProps = {
  children: null,
  className: '',
};
