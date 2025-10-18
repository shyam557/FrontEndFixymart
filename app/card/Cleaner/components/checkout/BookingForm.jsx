"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function BookingConfirmation() {
  const router = useRouter();
  const params = useSearchParams();

  const bookingId = params.get("bookingId") || "QSBK-20250726-001";
  const date = params.get("date") || "27 July 2025";
  const time = params.get("time") || "9:00 AM - 12:00 PM";
  const service = params.get("service") || "Home Deep Cleaning";
  const cleaner = params.get("cleaner") || "Amit Kumar";
  const supportNumber = "+91 98765 43210";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f8fa] p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center gap-4 border">
        <div className="text-green-600 text-5xl mb-2">✔️</div>
        <div className="text-2xl font-bold text-green-700 mb-1">Booking Confirmed</div>
        <div className="text-gray-700 text-center mb-2">
          Your booking is confirmed. You can pay after the service is completed.
        </div>

        {/* Booking Info */}
        <div className="w-full flex flex-col gap-2 bg-gray-50 rounded-xl p-4 border mb-2">
          <div className="flex items-center gap-2 text-base">
            <span className="font-semibold text-gray-800">Booking ID:</span>
            <span className="text-gray-700">{bookingId}</span>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span className="text-xl">📅</span>
            <span>{date}, {time}</span>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span className="text-xl">🧹</span>
            <span>{service}</span>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span className="text-xl">👤</span>
            <span>{cleaner}</span>
          </div>
        </div>

        {/* Support */}
        <div className="flex items-center gap-2 text-base mb-2">
          <span className="text-xl">📞</span>
          <span>
            Support: <a href={`tel:${supportNumber}`} className="text-blue-600 underline">{supportNumber}</a>
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <Link
            href="/my-bookings"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold text-center transition"
          >
            View My Bookings
          </Link>
          <button
            onClick={() => router.push("/")}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-bold text-center transition"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
