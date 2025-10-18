import React from "react";

export default function PaymentTabs({ tab, setTab }) {
  return (
    <div className="flex gap-2">
      {["Monthly", "Quarterly", "Yearly"].map((t) => (
        <button
          key={t}
          className={`px-3 py-1 rounded text-sm font-medium border transition-all ${tab === t ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white border-gray-200 text-gray-500"}`}
          onClick={() => setTab(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
