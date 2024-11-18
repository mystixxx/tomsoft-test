import DatePicker from "react-datepicker";
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import hr from 'date-fns/locale/hr';

registerLocale('hr', hr);

function Calendar({ 
  selected, 
  onChange, 
  placeholder = 'Odaberite datum...', 
  required = false,
  label = '',
  className = '' 
}) {
  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <DatePicker
          selected={selected}
          onChange={onChange}
          dateFormat="dd.MM.yyyy"
          locale="hr"
          placeholderText={placeholder}
          className="w-full px-10 py-2 bg-[#21222D] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a9dfd862] transition-all placeholder-[#D2D2D2]"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          calendarClassName="bg-[#21222D] border border-[#2C2D33] rounded-lg shadow-lg"
        />
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#D2D2D2]" />
        {selected && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[#2C2D33] rounded-full transition-colors"
          >
            <XMarkIcon className="h-4 w-4 text-[#D2D2D2] hover:text-white" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Calendar; 