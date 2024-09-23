import { createContext } from 'react';
import { Modal } from '../provider';

type ModalContextValue = (modal: Modal) => void;

const ModalContext = createContext<ModalContextValue | null>(null);

export default ModalContext;
