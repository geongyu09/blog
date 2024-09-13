'use client';

import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
  key?: string;
  domNode?: HTMLElement;
}
export default function PortalCreator({
  children,
  domNode = document.body,
  key,
}: ModalProps) {
  return createPortal(children, domNode, key);
}
