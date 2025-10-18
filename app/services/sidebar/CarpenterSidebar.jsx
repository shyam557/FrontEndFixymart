'use client';

export default function CarpenterSidebar({ onScrollTo }) {
  const items = [
     { label: "Door", key: "Door" },
    { label: "Cupboard & Drawer", key: "CupboardDrawer" },
    { label: "Furniture Repair", key: "FurnitureRepair" },
     { label: "Bed & Sofa", key: "Bed & Sofa" },
  ];

  return (
    <aside className="p-4 space-y-4">
      <h3 className="text-lg font-bold mb-2">Carpenter Services</h3>
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.key}
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
