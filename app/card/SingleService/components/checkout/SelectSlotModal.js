import React from "react";
export default function SelectSlotModal({ onClose, onSelect }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="font-bold text-lg mb-4">Select Slot</div>
        <div className="flex flex-col gap-2 mb-4">
          <button className="bg-gray-100 rounded p-2" onClick={() => onSelect({ slot: "9:00 AM - 12:00 PM", day: "28 July 2025" })}>9:00 AM - 12:00 PM</button>
          <button className="bg-gray-100 rounded p-2" onClick={() => onSelect({ slot: "1:00 PM - 4:00 PM", day: "28 July 2025" })}>1:00 PM - 4:00 PM</button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
