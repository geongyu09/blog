import cn from '@/utils/cn';
import { cva, VariantPropts } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

export const ButtonVariants = cva(
  `flex justify-center items-center rounded-md focus:outline-none`,

  {
    variants: {
      variant: {
        default: 'active:scale-100',
        grey: 'bg-slate-100 text-slate-900',
      },
      size: {
        default: '',
        md: `w-24 h-8 text-md rounded-md`,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export default function Button() {
  return <button></button>;
}
