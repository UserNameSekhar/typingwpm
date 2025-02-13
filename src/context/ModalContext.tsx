// ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import ConfirmationModal from "../components/common/confirmationModal/ConfirmationModal";

interface ModalContextType {
  showModal: (title: string, message: string, onConfirm: (id?:string) => void) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const showModal = (title: string, message: string, onConfirm: () => void) => {
    setTitle(title);
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      <ConfirmationModal
        isOpen={isOpen}
        title={title}
        message={message}
        onConfirm={() => {
          onConfirm();
          closeModal();
        }}
        onCancel={closeModal}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
