"use client";
import React from "react";
export default function BookingConfirmation() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f8fa] p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center gap-4 border">
        <div className="text-green-600 text-5xl mb-2">✔️</div>
        <div className="text-2xl font-bold text-green-700 mb-1">Booking Confirmed</div>
        <div className="text-gray-700 text-center mb-2">
          Your AC service booking is confirmed. You can pay after the service is completed.
        </div>
        <div className="w-full flex flex-col gap-2 bg-gray-50 rounded-xl p-4 border mb-2">
          <div className="flex items-center gap-2 text-base">
            <span className="font-semibold text-gray-800">Booking ID:</span>
            <span className="text-gray-700">QSBK-AC-20250728-001</span>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span className="text-xl">📅</span>
            <span>28 July 2025, 9:00 AM - 12:00 PM</span>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span className="text-xl">🧊</span>
            <span>AC Service</span>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span className="text-xl">👤</span>
            <span>Rahul Singh</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-base mb-2">
          <span className="text-xl">📞</span>
          <span>Support: <a href="tel:+919876543210" className="text-blue-600 underline">+91 98765 43210</a></span>
        </div>
        <div className="flex gap-3 w-full">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold text-center transition">View My Bookings</button>
          <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-bold text-center transition">Home</button>
        </div>
      </div>
    </div>
  );
}
