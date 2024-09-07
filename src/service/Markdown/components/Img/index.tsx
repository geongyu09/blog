import React from 'react';
import cn from '@/utils/cn';
import Image from 'next/image';

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export default function Img({
  className = '',
  width,
  height,
  src,
  alt,
}: ImgProps): JSX.Element {
  return (
    <Image
      width={width ? Number(width) : 0}
      height={height ? Number(height) : 0}
      src={src ?? ''}
      alt={alt ?? ''}
      className={cn('my-4', className)}
    />
  );
}

Img.defaultProps = {
  className: '',
};
