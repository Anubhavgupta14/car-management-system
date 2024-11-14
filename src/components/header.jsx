import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <header className="bg-white dark:bg-gray-800 dark:shadow-gray-900">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Left section (empty for alignment) */}
          <div className="w-24"></div>
          
          {/* Center section */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Car Management System
          </h1>
          
          {/* Right section */}
          <div className="relative w-24 flex justify-end">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Profile menu"
            >
              <UserCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg dark:shadow-gray-900/80 py-1 z-10 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;