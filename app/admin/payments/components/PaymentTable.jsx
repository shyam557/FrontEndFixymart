import React from "react";
import { Eye, Download, RotateCcw } from "lucide-react";

export default function PaymentTable({ payments, setPayments }) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-gray-700">
          <th className="px-4 py-3 text-left">DATE</th>
          <th className="px-4 py-3 text-left">AMOUNT</th>
          <th className="px-4 py-3 text-left">STATUS</th>
          <th className="px-4 py-3 text-left">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p, i) => (
          <tr key={i} className="border-t hover:bg-gray-50">
            <td className="px-4 py-3">{p.date}</td>
            <td className="px-4 py-3 font-semibold">₹{p.amount.toLocaleString()}</td>
            <td className="px-4 py-3">
              {p.status === "Completed" && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Completed</span>
              )}
              {p.status === "Pending" && (
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">Pending</span>
              )}
              {p.status === "Failed" && (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">Failed</span>
              )}
            </td>
            <td className="px-4 py-3 flex gap-2">
              <button className="text-blue-600 hover:bg-blue-50 p-1 rounded" title="View"><Eye size={16} /></button>
              <button className="text-green-600 hover:bg-green-50 p-1 rounded" title="Download"><Download size={16} /></button>
              {p.status === "Failed" && (
                <button className="text-red-600 hover:bg-red-50 p-1 rounded" title="Retry"><RotateCcw size={16} /></button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
