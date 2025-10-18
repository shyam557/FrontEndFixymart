import React from "react";
export default function RelatedServicesPage({ relatedAddOns = [], selectedAddOns = [], toggleAddOn }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 border mb-4">
      <div className="font-bold mb-2">Related AC Add-ons</div>
      {relatedAddOns.length === 0 ? (
        <div className="text-gray-500">No add-ons available.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {relatedAddOns.map(addOn => (
            <label key={addOn.key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAddOns.includes(addOn.key)}
                onChange={() => toggleAddOn(addOn.key)}
                className="accent-blue-600 w-4 h-4"
              />
              <span className="font-semibold">{addOn.label}</span>
              <span className="ml-auto text-gray-700">₹{addOn.price}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
