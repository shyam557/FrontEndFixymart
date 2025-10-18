import React from "react";
import { CreditCard, Banknote, Wallet, Landmark } from "lucide-react";

const methods = [
  { name: "Credit Card", percent: 42, icon: <CreditCard className="w-5 h-5 text-purple-500" />, color: "bg-purple-50" },
  { name: "Bank Transfer", percent: 35, icon: <Landmark className="w-5 h-5 text-green-500" />, color: "bg-green-50" },
  { name: "UPI", percent: 18, icon: <Banknote className="w-5 h-5 text-blue-500" />, color: "bg-blue-50" },
  { name: "Wallet", percent: 5, icon: <Wallet className="w-5 h-5 text-red-400" />, color: "bg-red-50" },
];

export default function PaymentMethods() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-base font-semibold mb-3">Payment Methods</h3>
      <div className="space-y-2">
        {methods.map((m) => (
          <div key={m.name} className={`flex items-center gap-3 p-2 rounded ${m.color}`}>
            {m.icon}
            <span className="flex-1 text-sm">{m.name}</span>
            <span className="font-semibold text-gray-700">{m.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
