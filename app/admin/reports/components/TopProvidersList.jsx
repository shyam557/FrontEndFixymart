import React from "react";

const TopProvidersList = ({ providers }) => (
  <div className="bg-white rounded-lg p-4 flex-1 mr-2">
    <div className="font-semibold mb-2">Top Performing Service Providers</div>
    {providers.map((p, idx) => (
      <div key={idx} className="flex items-center justify-between py-2 border-b last:border-b-0">
        <div className="flex items-center gap-2">
          <span className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-xs">48 × 48</span>
          <div>
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-gray-500">{p.role}</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold mb-1">{p.rating}★</span>
          <span className="text-indigo-600 text-xs underline cursor-pointer">{p.bookings} bookings</span>
        </div>
      </div>
    ))}
  </div>
);

export default TopProvidersList;
