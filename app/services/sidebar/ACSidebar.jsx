'use client';

import React from "react";

const ACSidebar = ({ onScrollTo }) => {
  const items = [
    { label: "Service", key: "Service" },
    { label: "Repair & Gas Refill", key: "Repair & Gas Refill" },
    { label: "Installation/Uninstallation", key: "Installation/Uninstallation" },
    { label: "Washing Machine", key: "Washing Machine" },
    { label: "Television", key: "Television" },
    { label: "Geyser", key: "Geyser" },
    { label: "Air Cooler", key: "Air Cooler" },

  ];

  return (
    <aside className="p-4 space-y-4">
      <h3 className="text-lg font-bold mb-2">AC Services</h3>
      <nav className="space-y-2">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onScrollTo(item.key)}
            className="block text-left w-full text-gray-700 hover:text-black hover:underline"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default ACSidebar;
