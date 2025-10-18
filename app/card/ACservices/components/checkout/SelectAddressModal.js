import React from "react";
export default function SelectAddressModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="font-bold text-lg mb-4">Select Address</div>
        <div className="flex flex-col gap-2 mb-4">
          <button className="bg-gray-100 rounded p-2">123 Main St, City</button>
          <button className="bg-gray-100 rounded p-2">456 Park Ave, City</button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
