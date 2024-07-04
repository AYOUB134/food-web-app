import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const [language, setLanguage] = useState('English');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Order Started by', name);
    // Navigate to /home
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white">
      <div className="w-full max-w-80 mx-auto flex flex-col items-center justify-center h-1/2 md:max-w-md">
        <div className="w-full mt-2 mb-8">
          <h1 className="text-2xl mb-2 text-black">
            {language === 'English' ? 'Tarim Garden' : '塔里木花园'}
          </h1>
          <p className="text-lg mb-4 text-black">
            {language === 'English' ? 'Your Table Number is' : '您的桌号是'}{' '}
           <span  style={{ backgroundColor: '#e00051' }}></span>
          </p>
        </div>
        <div className="w-full text-left mb-2">
          <p className="text-gray-700 mt-4 mb-2">
            {language === 'English' ? 'Select Display Language' : '选择显示语言'}
          </p>
        </div>
        <div className="flex space-x-4 mb-8 w-full">
          <button
            onClick={() => handleLanguageChange('中文')}
            className={`flex-1 px-4 py-2 ${language === '中文' ? 'bg-black text-white' : 'bg-gray-200'} rounded-3xl`}
          >
            中文
          </button>
          <button
            onClick={() => handleLanguageChange('English')}
            className={`flex-1 px-4 py-2 ${language === 'English' ? 'bg-black text-white' : 'bg-gray-200'} rounded-3xl`}
          >
            English
          </button>
        </div>
        <input
          type="text"
          placeholder={language === 'English' ? 'Your Name*' : '您的名字*'}
          value={name}
          onChange={handleNameChange}
          className="border border-gray-300 rounded-3xl p-2 mb-6 w-full"
        />
        <button
          onClick={handleSubmit}
          className=" text-white px-6 py-2 rounded-3xl w-full"
          style={{ backgroundColor: '#e00051' }}
        >
          {language === 'English' ? 'Start Ordering' : '开始点餐'}
        </button>
      </div>
      <div className="w-full max-w-90 mx-auto text-center py-4 text-gray-500 md:text-gray-300">
        Powered by <span className="text-black font-bold">chowbus</span>
      </div>
    </div>
  );
};

export default Start;
