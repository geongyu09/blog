import { createContext } from 'react';
import { ModalContextValue } from '../types';

const ModalContext = createContext<ModalContextValue | null>(null);

export default ModalContext;
