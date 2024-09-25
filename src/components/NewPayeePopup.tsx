import React from "react";
import ReactDOM from "react-dom";

interface NewPayeePopupProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // Add this line to include `children`
}

export const NewPayeePopup: React.FC<NewPayeePopupProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-native-milk p-6 rounded-lg shadow-lg w-[40%] rounded-[20px] px-10 py-10 relative">
        <button
          className="absolute top-4 right-4 text-black"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
