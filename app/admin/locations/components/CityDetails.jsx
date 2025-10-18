import React from "react";

const CityDetails = ({ city, onEdit, onDeactivate }) => (
  <div className="bg-white rounded-xl p-6 mb-4">
    <div className="font-semibold text-lg mb-2">{city.name} Location Details</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="font-semibold mb-1">Basic Information</div>
        <div className="mb-1 text-sm"><span className="text-gray-500">City Name</span><br /><span className="font-bold">{city.name}</span></div>
        <div className="mb-1 text-sm"><span className="text-gray-500">State</span><br /><span className="font-bold">{city.state}</span></div>
        <div className="mb-1 text-sm"><span className="text-gray-500">Country</span><br /><span className="font-bold">{city.country}</span></div>
        <div className="mb-1 text-sm"><span className="text-gray-500">Status</span><br /><span className="text-green-600 font-bold">Active</span></div>
        <div className="font-semibold mt-4 mb-1">Service Availability</div>
        <div className="grid grid-cols-2 gap-2">
          {city.services.map((s, i) => (
            <span key={i} className="bg-green-100 text-green-900 rounded px-2 py-1 text-xs">{s}</span>
          ))}
        </div>
      </div>
      <div>
        <div className="font-semibold mb-1">Coverage Information</div>
        <div className="mb-1 text-sm"><span className="text-gray-500">Covered Localities</span><br /><span className="font-bold">{city.localities}</span></div>
        <div className="mb-1 text-sm"><span className="text-gray-500">Serviceable Pincodes</span><br /><span className="font-bold">{city.pincodes}</span></div>
        <div className="mb-1 text-sm"><span className="text-gray-500">Activation Date</span><br /><span className="font-bold">{city.activationDate}</span></div>
        <div className="mb-1 text-sm"><span className="text-gray-500">Last Updated</span><br /><span className="font-bold">{city.lastUpdated}</span></div>
        <div className="flex gap-2 mt-4">
          <button className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded flex items-center gap-1 border border-indigo-200" onClick={onEdit}><i className="fa fa-edit" /> Edit</button>
          <button className="bg-red-50 text-red-600 px-4 py-2 rounded flex items-center gap-1 border border-red-200" onClick={onDeactivate}><i className="fa fa-trash" /> Deactivate</button>
        </div>
      </div>
    </div>
  </div>
);
export default CityDetails;
