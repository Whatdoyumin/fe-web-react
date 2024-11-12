import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export default function PasswordInput({ title, placeholder, width, value, onChange, onBlur }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputClassName = `w-full px-5 py-3 bg-white rounded border border-gray-200 text-gray-800 text-base font-medium outline-none`;

  return (
    <div className={`flex flex-col items-start justify-start gap-2`}>
      {title && <div className="containerTitle">{title}</div>}
      <div
        className="relative"
        style={{ width: width ? (isNaN(width) ? width : `${width}rem`) : '100%' }}
      >
        <input
          className={`${inputClassName}`}
          placeholder={placeholder}
          style={{
            overflowWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            width: width ? (isNaN(width) ? width : `${width}rem`) : '100%',
          }}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={showPassword ? 'text' : 'password'}
        />
        <div
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-5"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash color="#4B5563" /> : <FaEye color="#4B5563" />}
        </div>
      </div>
    </div>
  );
}
