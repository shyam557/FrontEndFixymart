import React from "react";

const CityList = ({ cities, selectedId, onSelect, onAdd, onViewAll }) => (
  <div className="bg-white rounded-xl p-4 w-full max-w-xs min-w-[260px]">
    <div className="flex items-center justify-between mb-2">
      <div className="font-semibold">Active Cities</div>
      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">{cities.length} Locations</span>
    </div>
    <div className="flex flex-col gap-2 mb-2">
      {cities.slice(0, 3).map(city => (
        <div
          key={city.id}
          className={`rounded border px-3 py-2 cursor-pointer ${selectedId === city.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}
          onClick={() => onSelect(city.id)}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{city.name}</div>
              <div className="text-xs text-gray-500">{city.state}, {city.country}</div>
            </div>
            <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded">Active</span>
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="font-semibold">{city.servicePros.toLocaleString()} Service Pros</span>
            <span className="font-semibold">{city.localities} Localities</span>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
      <span>Showing 3 of {cities.length} locations</span>
      <button className="text-indigo-600 underline" onClick={onViewAll}>View All</button>
    </div>
    <button className="bg-indigo-600 text-white w-full py-2 rounded" onClick={onAdd}>+ Add New Location</button>
  </div>
);
export default CityList;
