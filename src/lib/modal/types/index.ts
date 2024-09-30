export interface PushModal {
  modal: Modal;
  onClose?: () => void; // 모달이 닫힐 때 실행할 콜백
}

export interface ModalContextValue {
  pushModal: ({ modal, onClose }: PushModal) => void;
  setResponse: (response: boolean | string) => void;
  getResponse: () => string | boolean | null;
  closeModal: () => void;
}

export type Modal = React.ReactNode;
