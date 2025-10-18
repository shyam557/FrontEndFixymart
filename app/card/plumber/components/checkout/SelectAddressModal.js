"use client";
import React, { useState } from "react";

export default function SelectAddressModal({ onClose }) {
  // Example saved addresses
  const savedAddresses = [
    { icon: "🏠", label: "Home" },
    { icon: "💼", label: "Work" },
    { icon: "📍", label: "Mansion Vista Apts" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col gap-4 relative">
        <button className="absolute top-3 right-4 text-3xl text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <div className="text-3xl font-extrabold text-center mb-2">Select an Address</div>
        <button className="w-full flex items-center gap-2 border rounded-xl px-4 py-3 text-md font-medium mb-2">
          <span className="text-xl">📍</span> Use current location
        </button>
        <div className="w-full flex items-center gap-2 border rounded-xl px-4 py-3 mb-2">
          <span className="text-xl">🔍</span>
          <input className="w-full outline-none text-md bg-transparent" placeholder="Search for area, street name..." />
        </div>
        <button className="w-full flex items-center gap-2 border rounded-xl px-4 py-3 text-md font-medium mb-2">
          <span className="text-xl">📍</span> Select location on the map
        </button>
        <div className="text-xs font-semibold text-gray-500 mt-2 mb-1">SAVED ADDRESSES</div>
        <div className="flex flex-col gap-2">
          {savedAddresses.map(addr => (
            <button key={addr.label} className="w-full flex items-center gap-3 text-md px-2 py-2 rounded hover:bg-gray-100">
              <span className="text-xl">{addr.icon}</span> {addr.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
