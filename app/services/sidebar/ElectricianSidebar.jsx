'use client';

import React from "react";

const ElectricianSidebar = () => {
  const items = [
    { label: "Switch & Socket", key: "SwitchSocket" },
    { label: "Fan", key: "Fan" },
    { label: "Wall/Ceiling Light", key: "WallCeilingLight" },
    { label: "Wiring", key: "Wiring" },
    { label: "Appliance", key: "Appliance" },
    { label: "Doorbell", key: "Doorbell" },
    { label: "MCB & Submeter", key: "MCBSubmeter" },
    { label: "Inverter & Stabiliser", key: "InverterStabiliser" },
  ];

  return (
    <aside className="p-4 space-y-4">
      <h3 className="text-lg font-bold mb-2">Electrician Services</h3>
      <nav className="space-y-2">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={`#${item.key}`}
            className="block text-left w-full text-gray-700 hover:text-black hover:underline"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default ElectricianSidebar;