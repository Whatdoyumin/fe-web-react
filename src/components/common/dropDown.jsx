import React from 'react';

const Dropdown = ({ options = [], placeholder, selected, onChange, disabled }) => {
  return (
    <div className="relative text-base font-light text-gray-600">
      <select
        className="block w-full cursor-pointer appearance-none rounded border border-gray-200 bg-white px-5 py-3 pr-8 leading-tight 
        hover:bg-gray-50 focus:border-gray-500 focus:bg-white focus:outline-none"
        value={selected || ''}
        onChange={disabled ? undefined : onChange}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
