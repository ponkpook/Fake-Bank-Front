import React from 'react';
import ReactDOM from 'react-dom';

interface NewPayeePopupProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode; // Add this line to include `children`
}

const NewPayeePopup: React.FC<NewPayeePopupProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <button
            className="absolute top-2 right-2 text-gray-500"
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

export default NewPayeePopup;


