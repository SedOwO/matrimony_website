import React from 'react';

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button 
      type={type} 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
