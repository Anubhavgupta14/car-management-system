import React, { useState, useEffect, useRef } from 'react';
import { UserCircle } from 'lucide-react';
import { useRouter } from 'next/router';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('token');
    router.push('/auth');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 dark:shadow-gray-900">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="w-24"></div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Car Management System
          </h1>
          <div className="relative w-24 flex justify-end">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Profile menu"
            >
              <UserCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg dark:shadow-gray-900/80 py-1 z-10 border border-gray-200 dark:border-gray-700">
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