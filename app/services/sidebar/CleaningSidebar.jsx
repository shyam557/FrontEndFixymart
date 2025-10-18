'use client';

import React from 'react';

export default function CleaningSidebar({ onScrollTo }) {
  const items = [
    { label: 'Bathroom Cleaning', key: 'Bathroom Cleaning' },
    { label: ' Kitchen Cleaning', key: ' Kitchen Cleaning' },
    { label: 'Full Home Cleaning', key: 'Full Home Cleaning' },
    { label: 'Gym Cleaning', key: 'Gym Cleaning' },
    { label: 'Office & Showroom Cleaning', key: 'Office & Showroom Cleaning' },
     
   
  ];

  return (
    <aside className="p-4 space-y-4">
      <h3 className="text-lg font-bold mb-2">Cleaning Services</h3>
      <nav className="space-y-2">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onScrollTo(item.key)}
            className="block w-full text-left text-gray-700 hover:text-black hover:underline"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
