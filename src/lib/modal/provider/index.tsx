'use client';

// 모달 컴포넌트에서는 response를 set할 수 있도록 하고, 이에 대한 상태를 일반 트리에서 가져올 수 있도록 해야 함. (일반 컴포넌트 : read, 모달 :  write)
// 이 값은 모달이 닫힐 때 초기화 되어야한다.
// 모달이 닫힐 때 callback도 받아서 실행되도록 해야할듯? (열 때 실행할 콜백은 나중에)

import { useCallback, useEffect, useMemo, useState } from 'react';
import PortalCreator from '@/components/common/lib/modal/PortalCreator';
import ModalContext from '../context/index';
import type { Modal, ModalContextValue, PushModal } from '../types';

interface ModalQueueItem {
  key: string;
  modal: Modal;
  onClose: () => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalQueue, setModalQueue] = useState<ModalQueueItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // in modal state
  const [modalCloseResponse, setModalCloseResponse] = useState<
    boolean | string | null
  >(null);

  const currentModal = modalQueue[0];

  useEffect(() => {
    if (modalQueue.length > 0) {
      setIsOpen(true);
    }
  }, [modalQueue, setIsOpen]);

  const pushModal = useCallback(({ modal, onClose = () => {} }: PushModal) => {
    const key = Date.now().toString();

    const newModal: ModalQueueItem = {
      key,
      modal,
      onClose,
    };
    setModalQueue((prev) => [...prev, newModal]);
  }, []);

  /**
   * 모달의 리턴값을 설정하는 함수
   * 이는 모달 컴포넌트 내에서 사용할 수 있다.
   */
  const setResponse = useCallback((response: boolean | string) => {
    setModalCloseResponse(response);
  }, []);

  /**
   * 모달의 리턴값을 가져오는 함수
   * 이는 일반 컴포넌트에서 사용할 수 있다.
   */
  const getResponse = useCallback(() => {
    return modalCloseResponse;
  }, [modalCloseResponse]);

  /**
   * 모달을 닫는 함수
   * ModalQueue에서 첫번째 모달을 제거하고, isOpen을 false로 변경한다.
   */
  const closeModal = useCallback(() => {
    currentModal.onClose();
    setModalQueue((prev) => prev.slice(1));
    setIsOpen(false);
  }, [currentModal]);

  const value: ModalContextValue = useMemo(
    () => ({
      pushModal,
      setResponse,
      getResponse,
      closeModal,
    }),
    [pushModal, setResponse, getResponse, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isOpen && <PortalCreator>{modalQueue[0].modal}</PortalCreator>}
    </ModalContext.Provider>
  );
}
