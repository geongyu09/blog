import { createContext } from 'react';

export type Modal = React.ReactNode;

type ModalContextValue = (modal: Modal) => void;

const ModalContext = createContext<ModalContextValue | null>(null);

export default ModalContext;
