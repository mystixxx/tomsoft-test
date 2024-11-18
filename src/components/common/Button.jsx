import PropTypes from 'prop-types';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const VARIANTS = {
  primary: "bg-[#A9DFD8] text-black hover:bg-[#98cec7] disabled:bg-[#a9dfd862]",
  secondary: "bg-[#2C2D33] text-white hover:bg-[#383942] disabled:bg-[#2c2d3362]"
};

const Button = ({ 
  onClick, 
  disabled = false, 
  loading = false,
  label = 'Proceed',
  className = '',
  variant = 'primary',
  icon: Icon = ArrowRightIcon
}) => {
  const baseStyles = "px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${VARIANTS[variant]} ${className} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {label}
      {!loading && Icon && <Icon className="h-5 w-5" />}
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
            fill="none"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  icon: PropTypes.elementType
};

export default Button; 