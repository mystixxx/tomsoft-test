import { Atom } from 'react-loading-indicators';

export const LoadingSpinner = ({ className = 'h-full' }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <Atom color="#4aebd5" size="large" />
  </div>
); 