import React, { useState } from "react";

const timeSlots = [
  "08:00 AM", "08:30 AM", "09:00 AM",
  "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM",
  "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM",
  "06:30 PM", "07:00 PM", "07:30 PM"
];

const days = [
  { label: "Sat", date: 26 },
  { label: "Sun", date: 27 },
  { label: "Mon", date: 28 },
];

export default function SelectSlotModal({ onClose, onSelect }) {
  const [selectedDay, setSelectedDay] = useState(days[0].date);
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto mt-16">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-200 text-xs px-2 py-1 rounded font-semibold text-gray-600">Instant</span>
            <span className="text-gray-500 text-sm">In 30 mins</span>
            <span className="text-red-500 text-xs ml-2">Unavailable at the moment</span>
          </div>
          <div className="font-semibold text-md mb-2">Schedule for later</div>
          <div className="flex gap-2 mb-4">
            {days.map(day => (
              <button
                key={day.date}
                className={`flex flex-col items-center px-3 py-2 rounded-lg border font-semibold text-sm transition ${selectedDay === day.date ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
                onClick={() => setSelectedDay(day.date)}
              >
                <span>{day.label}</span>
                <span className="text-base font-bold">{day.date}</span>
              </button>
            ))}
          </div>
          <div className="text-xs text-blue-600 mb-2">Online payment only for selected date</div>
          <div className="font-semibold mb-2">Select start time of service</div>
          <div className="grid grid-cols-3 gap-2 max-h-[320px] overflow-y-auto">
            {timeSlots.map(slot => (
              <button
                key={slot}
                className={`py-2 rounded-lg border text-sm font-semibold transition ${selectedSlot === slot ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`w-full py-3 rounded-lg font-bold text-md mt-4 transition ${selectedSlot ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={!selectedSlot}
          onClick={() => {
            if (selectedSlot) {
              onSelect && onSelect({ day: selectedDay, slot: selectedSlot });
              onClose();
            }
          }}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
