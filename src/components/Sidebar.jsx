import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  DocumentTextIcon as DocumentOutline,
  CircleStackIcon as CircleStackOutline,
  ChartBarIcon as ChartBarOutline,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import {
  DocumentTextIcon as DocumentSolid,
  CircleStackIcon as CircleStackSolid,
  ChartBarIcon as ChartBarSolid,
} from '@heroicons/react/24/solid';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { 
      path: '/', 
      icons: { outline: DocumentOutline, solid: DocumentSolid }, 
      label: 'Artikli' 
    },
    { 
      path: '/obracun-vp', 
      icons: { outline: CircleStackOutline, solid: CircleStackSolid }, 
      label: 'Obračun VP' 
    },
    { 
      path: '/obracun-art', 
      icons: { outline: ChartBarOutline, solid: ChartBarSolid }, 
      label: 'Obračun - Artikli' 
    },
  ];

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-32'} bg-sidebar h-screen flex flex-col border-r-2 border-[#2C2D33] transition-all duration-300`}>
      <div className={`p-6 flex ${isExpanded ? 'justify-between' : 'justify-center'} items-center`}>
        {isExpanded && <h1 className="text-2xl font-bold text-white uppercase">Tomsoft</h1>}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white hover:bg-[#2C2D33] rounded-lg p-2 transition-colors"
        >
          {isExpanded ? (
            <ChevronLeftIcon className="h-6 w-6" />
          ) : (
            <ChevronRightIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map(({ path, icons, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => 
              `sidebar-item ${isActive ? 'active' : ''} ${!isExpanded ? 'justify-center px-2' : ''}`
            }
          >
            {({ isActive }) => {
              const Icon = isActive ? icons.solid : icons.outline;
              return (
                <>
                  <Icon className={`sidebar-icon ${isActive ? 'active' : ''}`} />
                  {isExpanded && <span>{label}</span>}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>
      
      {isExpanded && (
        <div className="p-4 text-center text-gray-400 text-sm">
          Napravio Patrik Vulinec
        </div>
      )}
    </div>
  );
}

export default Sidebar; 