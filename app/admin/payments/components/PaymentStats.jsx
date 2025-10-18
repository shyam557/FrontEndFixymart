import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function PaymentStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-1">
        <span className="text-xs text-gray-500">Total Revenue</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">₹785,420</span>
          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">₹</span>
        </div>
        <span className="text-green-500 text-xs flex items-center gap-1">
          <ArrowUpRight size={14} /> +12% from last month
        </span>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-1">
        <span className="text-xs text-gray-500">Successful Payments</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">1,245</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">●</span>
        </div>
        <span className="text-green-500 text-xs flex items-center gap-1">
          <ArrowUpRight size={14} /> +8% from last month
        </span>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-1">
        <span className="text-xs text-gray-500">Failed Payments</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-red-600">32</span>
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">●</span>
        </div>
        <span className="text-red-500 text-xs flex items-center gap-1">
          <ArrowDownRight size={14} /> +4 from last month
        </span>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-1">
        <span className="text-xs text-gray-500">Refund Requests</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">14</span>
          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs">●</span>
        </div>
        <span className="text-yellow-600 text-xs flex items-center gap-1">
          <ArrowDownRight size={14} /> -2 from last month
        </span>
      </div>
    </div>
  );
}
