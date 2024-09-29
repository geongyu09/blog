'use client';

import { useCallback, useEffect, useState } from 'react';
import PortalCreator from '@/components/common/lib/modal/PortalCreator';
import ModalContext from '../context/index';
import type { Modal } from '../context/index';

interface ModalQueueItem {
  key: string;
  modal: Modal;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalQueue, setModalQueue] = useState<ModalQueueItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pushModal = useCallback((modal: Modal) => {
    const key = Date.now().toString();
    setModalQueue((prev) => [...prev, { key, modal }]);
  }, []);

  useEffect(() => {
    if (modalQueue.length > 0) {
      setIsOpen(true);
    }
  }, [modalQueue, setIsOpen]);

  <ModalContext.Provider value={pushModal}>
    {children}
    {/* {currentModal && <PortalCreator>{currentModal}</PortalCreator>} */}
    {isOpen && (
      <PortalCreator>
        <button
          type="button"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all w-full h-full"
          onClick={() => {
            setModalQueue((prev) => prev.slice(1));
            setIsOpen(false);
          }}
        >
          <div className="">{modalQueue[0].modal}</div>
        </button>
      </PortalCreator>
    )}
  </ModalContext.Provider>;
}
