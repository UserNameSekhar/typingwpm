import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion"; // Import framer-motion

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }} // Fade-in/out effect
    >
      <motion.div
        className="relative mx-4 bg-light-card dark:bg-dark-card rounded-lg shadow-lg max-w-lg w-full p-6 space-y-4"
        initial={{ y: "-20px" }}
        animate={{ y: 0 }}
        exit={{ y: "-20px" }}
        transition={{ duration: 0.3 }} // Slide-up animation
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
            {title}
          </h2>
          <button
            className="text-light-textSecondary dark:text-dark-textSecondary p-2"
            onClick={onCancel}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Message */}
        <p className="text-light-textSecondary dark:text-dark-textSecondary">
          {message}
        </p>

        {/* Modal Actions */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-light-bg dark:bg-dark-bg text-light-textSecondary dark:text-dark-textSecondary hover:text-light-textPrimary dark:hover:text-dark-textPrimary border rounded-lg transition-all duration-500 ease-in-out border-none outline-none ring-0 shadow-none hover:shadow-lg active:shadow-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow-md bg-light-buttonDanger dark:bg-dark-buttonDanger filter brightness-110 hover:brightness-125  transition-all"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationModal;
