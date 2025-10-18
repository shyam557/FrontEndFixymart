import React from "react";
import { FileText, Download, RefreshCcw, CreditCard } from "lucide-react";

export default function PaymentQuickActions() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-base font-semibold mb-3">Quick Actions</h3>
      <div className="space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50 transition text-blue-700">
          <FileText size={18} /> Generate Invoice
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-green-50 transition text-green-700">
          <Download size={18} /> Export Transactions
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-purple-50 transition text-purple-700">
          <RefreshCcw size={18} /> Payment Reconciliation
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-red-50 transition text-red-700">
          <CreditCard size={18} /> Process Refund
        </button>
      </div>
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">Pending Approvals</h4>
        <div className="text-gray-400 text-xs">No pending approvals</div>
      </div>
    </div>
  );
}
