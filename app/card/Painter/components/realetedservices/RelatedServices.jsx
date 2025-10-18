import React from "react";
import Image from "next/image";

export default function RelatedServices({ relatedAddOns, selectedAddOns, toggleAddOn }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 h-auto">
      <h3 className="text-lg font-bold mb-4">Related Services</h3>
      {Array.isArray(relatedAddOns) && relatedAddOns.length > 0 ? (
        relatedAddOns.map((item) => (
          <div
            key={item.key || item.title}
            className="flex items-center gap-4 bg-white border rounded-2xl p-4 mb-4 shadow-sm"
            style={{ minHeight: 120 }}
          >
            {/* Service Image */}
            <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image || "/default-service.jpg"}
                alt={item.title || item.label}
                fill
                className="object-cover text-sm"
                style={{ borderRadius: 12 }}
              />
            </div>
            {/* Service Info */}
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <div className="font-bold text-sm text-gray-900 leading-tight">{item.title || item.label}</div>
              <div className="text-gray-500  text-sm text-base leading-tight mb-1">{item.desc || item.description}</div>
              {/* Removed plus/minus icon row for clean UI */}
            </div>
            {/* Add Button and Price */}
            <div className="flex flex-col items-end justify-between h-full min-w-[90px] ml-2 text-sm">
              <button
                className={`rounded-lg px-6 py-2 font-bold mb-2 transition ${selectedAddOns.includes(item.key) ? 'bg-red-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                onClick={() => toggleAddOn(item.key)}
              >
                {selectedAddOns.includes(item.key) ? 'remove' : 'Add'}
              </button>
              <div className="text-md font-bold text-gray-900 text-sm">₹ {item.price}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-center py-8">No related services available.</div>
      )}
    </div>
  );
}
