"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProviderActivityTracking() {
  const activityData = [
    { day: "Mon", value: 3 },
    { day: "Tue", value: 5 },
    { day: "Wed", value: 8 },
    { day: "Thu", value: 7 },
    { day: "Fri", value: 6 },
    { day: "Sat", value: 4 },
    { day: "Sun", value: 4 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Provider Activity Tracking</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Last login time */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Last login time</p>
          <p className="text-xl font-bold text-gray-900">2 hours ago</p>
        </div>

        {/* Active currently online */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Active currently online?</p>
          <p className="text-xl font-bold text-gray-900">Yes</p>
        </div>

        {/* Today's completed jobs */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Today's completed jobs</p>
          <p className="text-xl font-bold text-gray-900">7</p>
        </div>

        {/* Ongoing job count */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Ongoing job count</p>
          <p className="text-xl font-bold text-gray-900">2</p>
        </div>
      </div>

      {/* Last 7 days activity chart - Full width */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
        <p className="text-gray-600 text-sm mb-4">Last 7 days activity</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 6 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom metrics - 3 columns */}
      <div className="grid grid-cols-3 gap-4">
        {/* Total hours spent */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Total hours spent</p>
          <p className="text-2xl font-bold text-gray-900">23</p>
        </div>

        {/* Acceptance rate */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Acceptance rate</p>
          <p className="text-2xl font-bold text-gray-900">85%</p>
        </div>

        {/* Cancellation rate */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Cancellation rate</p>
          <p className="text-2xl font-bold text-gray-900">3%</p>
        </div>
      </div>
    </div>
  );
}