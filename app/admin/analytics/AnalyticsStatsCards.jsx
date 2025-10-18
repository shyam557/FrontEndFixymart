import React from "react";
import { User, ShoppingCart, Layers, UserPlus, ShoppingBag, Users, ClipboardList } from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "28202",
    icon: <User className="w-6 h-6 text-blue-400" />, // blue
    bg: "bg-blue-50",
  },
  {
    label: "Total Orders",
    value: "5685",
    icon: <ShoppingCart className="w-6 h-6 text-green-400" />, // green
    bg: "bg-green-50",
  },
  {
    label: "Total Services",
    value: "34289",
    icon: <Layers className="w-6 h-6 text-purple-400" />, // purple
    bg: "bg-purple-50",
  },
  {
    label: "Today's New Users",
    value: "182",
    icon: <UserPlus className="w-6 h-6 text-pink-400" />, // pink
    bg: "bg-pink-50",
  },
  {
    label: "Today's Orders",
    value: "11",
    icon: <ShoppingBag className="w-6 h-6 text-yellow-400" />, // yellow
    bg: "bg-yellow-50",
  },
];

const recentUsers = [
  { username: "manishsharma648783", phone: "+91 7002990396", createdAt: "12 Aug 2025 at 5:10 pm" },
  { username: "furkazul", phone: "+1 8638091592", createdAt: "12 Aug 2025 at 5:05 pm" },
  { username: "Alex0477", phone: "+373 373 79373875", createdAt: "12 Aug 2025 at 5:02 pm" },
  { username: "akashnautiyal555", phone: "", createdAt: "12 Aug 2025 at 4:57 pm" },
  { username: "issamariamo499", phone: "+258 851841010", createdAt: "12 Aug 2025 at 4:55 pm" },
];

const recentOrders = [
  { orderId: "6633", username: "majaruddin", total: "USD 11.0000", orderStatus: "Completed", paymentStatus: "Paid", createdAt: "12 Aug" },
  { orderId: "6632", username: "kerpua", total: "USD 5.0000", orderStatus: "Pending", paymentStatus: "Pending", createdAt: "12 Aug" },
  { orderId: "6631", username: "gtxfile", total: "USD 11.0000", orderStatus: "Completed", paymentStatus: "Paid", createdAt: "12 Aug" },
  { orderId: "6630", username: "krishansihag9050", total: "INR 990.0000", orderStatus: "Completed", paymentStatus: "Paid", createdAt: "12 Aug" },
  { orderId: "6629", username: "pooweeyolo", total: "USD 5.0000", orderStatus: "Completed", paymentStatus: "Paid", createdAt: "12 Aug" },
];

export default function AnalyticsStatsCards() {
  return (
    <>
      <div className="flex flex-wrap gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl shadow flex-1 min-w-[200px] max-w-[240px] flex flex-col justify-between bg-white`}
            style={{ minHeight: 100 }}
          >
            {/* Colored header */}
            <div className={`flex items-center justify-between mb-0 rounded-t-xl p-3 ${stat.bg}`} style={{ minHeight: 48 }}>
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              <span className="rounded-full p-2 bg-white shadow-sm">{stat.icon}</span>
            </div>
            {/* White body */}
            <div className="flex-1 flex items-end p-4 rounded-b-xl bg-white">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Users and Recent Orders UI */}
      <div className="flex flex-wrap gap-6">
        {/* Recent Users */}
        <div className="bg-cyan-700 rounded-xl shadow flex-1 min-w-[350px] max-w-[500px] p-0">
          <div className="flex items-center justify-between px-6 py-3 rounded-t-xl">
            <div className="flex items-center gap-2 text-white font-semibold text-lg">
              <Users className="w-5 h-5" /> Recent Users
            </div>
            <button className="text-white text-sm font-medium flex items-center gap-1 hover:underline">VIEW ALL <span className="ml-1">→</span></button>
          </div>
          <div className="bg-white rounded-b-xl p-0 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="px-4 py-2 text-left font-medium">USER NAME</th>
                  <th className="px-4 py-2 text-left font-medium">PHONE</th>
                  <th className="px-4 py-2 text-left font-medium">CREATED AT</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-semibold text-cyan-900 whitespace-nowrap">{user.username}</td>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{user.phone}</td>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Recent Orders */}
        <div className="bg-green-700 rounded-xl shadow flex-1 min-w-[350px] max-w-[700px] p-0">
          <div className="flex items-center justify-between px-6 py-3 rounded-t-xl">
            <div className="flex items-center gap-2 text-white font-semibold text-lg">
              <ClipboardList className="w-5 h-5" /> Recent Orders
            </div>
            <button className="text-white text-sm font-medium flex items-center gap-1 hover:underline">VIEW ALL <span className="ml-1">→</span></button>
          </div>
          <div className="bg-white rounded-b-xl p-0 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="px-4 py-2 text-left font-medium">ORDER ID</th>
                  <th className="px-4 py-2 text-left font-medium">USERNAME</th>
                  <th className="px-4 py-2 text-left font-medium">TOTAL</th>
                  <th className="px-4 py-2 text-left font-medium">ORDER STATUS</th>
                  <th className="px-4 py-2 text-left font-medium">PAYMENT STATUS</th>
                  <th className="px-4 py-2 text-left font-medium">CREATED AT</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-semibold text-green-900 whitespace-nowrap">{order.orderId}</td>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{order.username}</td>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{order.total}</td>
                    <td className={`px-4 py-2 whitespace-nowrap`}>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.orderStatus === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.orderStatus}</span>
                    </td>
                    <td className={`px-4 py-2 whitespace-nowrap`}>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{order.paymentStatus}</span>
                    </td>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{order.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
