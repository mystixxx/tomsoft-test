import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, placeholder = "Search here...", value = '' }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (newValue === '') {
      onSearch('');
    }
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="relative">
      <button
        onClick={handleSearchClick}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D2D2D2] hover:text-white transition-colors"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-10 py-2 bg-[#21222D] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a9dfd862] transition-all"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D2D2D2] hover:text-white transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default SearchBar; 