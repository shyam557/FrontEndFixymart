'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { servicesList } from './suggestions';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  const filtered = query
    ? servicesList.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (service) => {
    router.push(`/services?type=${encodeURIComponent(service)}`);
    setQuery('');
    setShowDropdown(false);
  };

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={inputRef}>
      <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-white focus-within:ring-2 focus-within:ring-purple-400">
        <Search className="h-4 w-4 text-gray-500 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search for ‘Services’"
          className="flex-1 outline-none bg-transparent text-sm text-gray-700"
        />
      </div>

      {showDropdown && query && filtered.length > 0 && (
        <ul className="absolute z-50 bg-white shadow-lg rounded mt-1 w-full max-h-60 overflow-y-auto border border-gray-200">
          {filtered.map((service, index) => (
            <li
              key={index}
              onClick={() => handleSelect(service)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {service}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
