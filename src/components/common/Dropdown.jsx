import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function Dropdown({ 
  options = [], 
  value = '', 
  onChange, 
  placeholder = 'Select an option...',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-[#21222D] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a9dfd862] transition-all flex justify-between items-center"
      >
        <span className={selectedOption ? 'text-white' : 'text-[#D2D2D2]'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon 
          className={`h-5 w-5 text-[#D2D2D2] transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-[#21222D] border border-[#2C2D33] rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-2 text-left hover:bg-[rgba(169,223,216,0.2)] transition-colors ${
                option.value === value 
                  ? 'text-white font-medium' 
                  : 'text-[#D2D2D2]'
              } ${option.value === value ? 'bg-[rgba(169,223,216,0.1)]' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown; 