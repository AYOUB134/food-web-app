import React from 'react';
import { FaCheck } from 'react-icons/fa'; // Import the check icon from react-icons

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-10 flex items-center justify-center z-50"> {/* Adjusted bg-opacity */}
      <div className="bg-white rounded-lg p-6 w-10/12 md:w-1/3"> {/* Adjusted padding, width and height */}
        <div className="flex flex-col items-center">
          <div className="bg-green-500 text-white rounded-full p-5 mb-4">
            <FaCheck className="text-white" /> {/* Check icon */}
          </div>
          <p className="text-gray-800 text-center mb-4">
            You don't have any orders. <br />
            Add some dishes to your shopping cart to start an order.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded w-full" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
