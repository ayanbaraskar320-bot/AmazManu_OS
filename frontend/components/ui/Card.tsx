import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-gray-700 ${className}`}>
      {title && <h3 className="text-lg font-bold text-white p-6 border-b border-gray-700">{title}</h3>}
      <div className="p-0">
        {children}
      </div>
    </div>
  );
};

export default Card;