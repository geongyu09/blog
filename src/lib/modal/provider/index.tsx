'use client';

import { useCallback, useState } from 'react';
import PortalCreator from '@/components/common/lib/modal/PortalCreator';
import ModalContext from '../context/index';

export type Modal = React.ReactNode;

interface ModalStackItem {
  key: string;
  modal: Modal;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalStack, setModalStack] = useState<ModalStackItem[]>([]);

  const pushModal = useCallback((modal: Modal) => {
    const key = Date.now().toString();
    setModalStack((prev) => [...prev, { key, modal }]);
  }, []);

  return (
    <ModalContext.Provider value={pushModal}>
      {children}
      {modalStack &&
        modalStack.map(({ modal }, index) => {
          return (
            <PortalCreator key={`${index * 2}-${modal}`}>
              <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all w-full h-full">
                <div className="">{modal}</div>
              </section>
            </PortalCreator>
          );
        })}
    </ModalContext.Provider>
  );
}
