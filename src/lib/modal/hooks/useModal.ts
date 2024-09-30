'use client';

import { useContext } from 'react';
import ModalContext from '../context';

export default function useModal() {
  if (!ModalContext)
    throw new Error('useModal은 ModalProvider 내부에서만 사용할 수 있습니다.');

  const context = useContext(ModalContext);

  if (!context)
    throw new Error('useModal은 ModalProvider 내부에서만 사용할 수 있습니다.');

  return context;
}
