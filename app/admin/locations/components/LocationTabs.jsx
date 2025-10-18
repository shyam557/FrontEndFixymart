import React from "react";

const LocationTabs = ({ active, onTab }) => (
  <div className="flex gap-8 border-b mb-4">
    {['Cities', 'Service Areas', 'Zones', 'Pincodes'].map(tab => (
      <button
        key={tab}
        className={`py-2 px-1 border-b-2 text-sm font-medium ${active === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
        onClick={() => onTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);
export default LocationTabs;
