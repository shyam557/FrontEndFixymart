"use client";

import { CheckCircle, AlertCircle } from "lucide-react";

export default function BookingAnalytics() {
  const stats = [
    {
      label: "Successful bookings",
      value: "7,500",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Rescindind",
      value: "500",
      icon: AlertCircle,
      color: "text-orange-600",
    },
    {
      label: "Cancelled cankings",
      value: "2,000",
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      label: "Construive avrums",
      value: "2.5 hrs",
      icon: AlertCircle,
      color: "text-blue-600",
    },
    {
      label: "Complaint cases",
      value: "150",
      icon: AlertCircle,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Booking Analytics</h3>

      <div className="space-y-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-gray-700">{stat.label}</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}