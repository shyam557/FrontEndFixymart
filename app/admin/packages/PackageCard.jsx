import React from "react";
import { Star, Edit, Trash2 } from "lucide-react";

export default function PackageCard({ pkg, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-0 flex flex-col min-w-[350px] max-w-[400px] w-full overflow-hidden relative">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-4xl font-bold relative">
        600 × 400
        {pkg.badge && (
          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${pkg.badgeColor}`}>{pkg.badge}</span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="font-bold text-lg">{pkg.title}</div>
          <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs font-semibold">{pkg.services} Services</span>
        </div>
        <div className="text-gray-500 text-sm mb-2">{pkg.desc}</div>
        <div className="flex items-center gap-2 mb-2">
          {pkg.oldPrice && <span className="text-gray-400 line-through">₹{pkg.oldPrice}</span>}
          <span className="text-blue-700 font-bold text-lg">₹{pkg.price}</span>
          {pkg.perVisit && <span className="text-xs text-gray-400">(Per Visit)</span>}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-yellow-400" />
          <span className="font-semibold text-gray-700">{pkg.rating}</span>
          <span className="text-xs text-gray-400">({pkg.reviews})</span>
        </div>
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-700 px-3 py-2 rounded" onClick={onEdit}><Edit size={16}/> Edit</button>
          <button className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 px-3 py-2 rounded" onClick={onDelete}><Trash2 size={16}/> Delete</button>
        </div>
      </div>
      {pkg.status && (
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">{pkg.status}</span>
      )}
    </div>
  );
}
