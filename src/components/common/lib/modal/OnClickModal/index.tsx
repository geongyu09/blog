'use client';

import { useState } from 'react';
import PortalCreator from '../PortalCreator';

interface OnClickModalProps {
  children: () => React.ReactNode;
  modalContent: React.ReactNode;
}
export default function OnClickModal({
  children,
  modalContent,
}: OnClickModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  return (
    <div>
      <button type="button" onClick={openModal}>
        {children()}
      </button>
      {isOpen && <PortalCreator>{modalContent}</PortalCreator>}
    </div>
  );
}
