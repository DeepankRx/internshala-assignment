import React, { useState } from "react";

const Modal = ({ children, onClose, isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-6 md:inset-auto md:flex md:flex-col md:items-center md:justify-center w-full">
          <div className="bg-white rounded-lg shadow-md  md:w-1/2 flex flex-col justify-end">
            <div className="p-4 md:p-8">{children}</div>
            <button
              onClick={onClose}
              className=" p-1 bg-red-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
