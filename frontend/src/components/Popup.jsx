import React from "react";

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="
          bg-white 
          p-4 sm:p-6 
          rounded-lg shadow-lg 
          relative 
          w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%]
          max-h-[80vh] 
          overflow-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
