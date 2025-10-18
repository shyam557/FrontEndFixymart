"use client";

const PlumberSidebar = () => {
  const categories = [
    { label: "Bathroom Fittings", key: "Bathroom Fittings" },
     { label: "Tap & Mixer", key: "Tap & Mixer" },
    { label: "Toilet Services", key: "Toilet" }, 
    { label: "Water Tank & Sink ", key: "Water Tank & Sink Services" },
   
  ];

  return (
    <aside className="p-4 space-y-4">
      <h3 className="text-lg font-bold mb-2">Plumber Services</h3>
      <nav className="space-y-2">
        {categories.map((item, i) => (
          <a
            key={i}
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

export default PlumberSidebar;
