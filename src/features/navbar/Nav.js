import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineGlobal } from 'react-icons/ai'; // Import globe icon
import { MdPhone } from 'react-icons/md'; // Import phone icon from Material Design icons
import Modal from './Modal'; // Import the Modal component

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('english'); // State to track active language
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLanguageChange = (lang) => {
    setActiveLanguage(lang);
    // You can add logic here to handle language change if needed
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setMenuOpen(false); // Close menu when modal opens
  };

  return (
    <div className="static top-0 right-0 w-full bg-white z-50"> {/* Changed to position static */}
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-12 relative">
        <div className="flex items-center">
          <div className="text-gray-800 mr-2 text-sm">
            Ayoub {/* Replace with dynamic customer name */}
          </div>
          <div className="bg-red-800 text-white rounded-full h-5 w-5 flex items-center justify-center">
            1 {/* Replace with dynamic table number */}
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleModal}
            className="bg-gray-300 text-white px-2 py-2 rounded-full mr-4 md:hidden text-sm" // Adjusted padding and font size
            style={{ backgroundColor: '#D1D5DB', color: '#fff' }} // Set bg color same as the hamburger menu button
          >
            My Orders
          </button>
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 focus:outline-none rounded-full bg-gray-300 p-2"
          >
            {menuOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
          </button>
          <button
            className="hidden md:block bg-gray-300 text-white px-4 py-2 rounded-full mr-4 text-sm" // Adjusted font size
            onClick={toggleModal}
            style={{ backgroundColor: '#D1D5DB', color: '#fff' }} // Set bg color same as the hamburger menu button
          >
            My Orders
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-9/10 md:w-80 bg-white text-gray-800 z-50 transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="py-6 px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Chowbus</h2>
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none rounded-full bg-gray-300 p-2"
            >
              <FaTimes className="text-white" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">Welcome to Join as Member for Free</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full mb-4 w-full">
            Sign Up
          </button>
          <hr className="my-4 border-gray-300" />
          <div className="flex items-center mb-4">
            <AiOutlineGlobal className="h-6 w-6 text-gray-800 mr-2" /> {/* Globe icon */}
            <span className="text-gray-800 mr-2">Language </span> {/* Add space and colon after Languages */}
            <div className="ml-auto flex">
              <button
                className={`px-2 py-1 rounded-full mr-1 ${activeLanguage === 'english' ? 'bg-black text-white' : 'bg-gray-300'}`}
                onClick={() => handleLanguageChange('english')}
              >
                EN
              </button>
              <button
                className={`text-white px-2 py-1 rounded-full ${activeLanguage === 'chinese' ? 'bg-black' : 'bg-gray-800'}`}
                onClick={() => handleLanguageChange('chinese')}
              >
                中
              </button>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <MdPhone className="h-6 w-6 text-gray-800 mr-2" /> {/* Call icon */}
            <span className="text-gray-800">Call Waitstaff</span>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && <Modal isOpen={showModal} onClose={toggleModal} />}
    </div>
  );
};

export default Nav;
