"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProviderPerformance() {
  const monthlyBookingsData = [
    { month: "Jan", bookings: 400 },
    { month: "Feb", bookings: 600 },
    { month: "Mar", bookings: 700 },
    { month: "Apr", bookings: 800 },
    { month: "May", bookings: 900 },
    { month: "Jun", bookings: 1000 },
    { month: "Jul", bookings: 950 },
    { month: "Aug", bookings: 1100 },
    { month: "Sep", bookings: 1050 },
    { month: "Oct", bookings: 1200 },
    { month: "Nov", bookings: 1150 },
    { month: "Dec", bookings: 1300 },
  ];

  const monthlyRevenueData = [
    { month: "Jan", revenue: 5.0 },
    { month: "Feb", revenue: 6.5 },
    { month: "Mar", revenue: 6.0 },
    { month: "Apr", revenue: 7.0 },
    { month: "May", revenue: 7.2 },
    { month: "Jun", revenue: 7.5 },
    { month: "Jul", revenue: 7.3 },
    { month: "Aug", revenue: 8.0 },
    { month: "Sep", revenue: 7.8 },
    { month: "Oct", revenue: 8.5 },
    { month: "Nov", revenue: 8.2 },
    { month: "Dec", revenue: 9.0 },
  ];

  return (
    <div className="space-y-6">
      {/* Month-wise bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Month-wise bookings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyBookingsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: "12px" }} />
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
              dataKey="bookings"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Month-wise revenue */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Month-wise revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} maxBarSize={35} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}