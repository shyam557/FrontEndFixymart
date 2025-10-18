"use client";
import React, { useState } from "react";
import PackageCard from "./PackageCard";
import { Plus } from "lucide-react";
import EditPackageModal from "./EditPackageModal";
import AddPackageModal from "./AddPackageModal";

const TABS = [
  "All Services",
  "Home Cleaning",
  "Beauty",
  "Repairs",
  "Wellness",
];

const packagesData = [
  {
    title: "Premium Home Cleaning",
    desc: "Complete deep cleaning package for 2BHK apartments with premium products.",
    price: 1999,
    oldPrice: 2499,
    services: 3,
    badge: "Active",
    badgeColor: "bg-green-500 text-white",
    status: "Active",
    rating: 4.8,
    reviews: 120,
    category: "Home Services",
  },
  {
    title: "Royal Spa Package",
    desc: "Includes facial, manicure, pedicure, head massage, and foot reflexology.",
    price: 2999,
    oldPrice: 3499,
    services: 5,
    badge: "Popular",
    badgeColor: "bg-yellow-400 text-white",
    rating: 4.9,
    reviews: 85,
    category: "Wellness",
  },
  {
    title: "Electrical Repairs",
    desc: "Switchboard repairs and appliance wiring checks by certified electricians.",
    price: 1299,
    services: 2,
    badge: "New",
    badgeColor: "bg-blue-400 text-white",
    perVisit: true,
    rating: 4.7,
    reviews: 64,
    category: "Repairs",
  },
];

export default function PackagesPage() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [pkgs, setPkgs] = useState(packagesData);
  const [editIdx, setEditIdx] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [switcher, setSwitcher] = useState(false);

  const handleEdit = (idx) => setEditIdx(idx);
  const handleSave = (pkg) => {
    setPkgs(pkgs.map((p, i) => (i === editIdx ? pkg : p)));
    setEditIdx(null);
  };
  const handleDelete = (idx) => {
    if (window.confirm("Delete this package?")) {
      setPkgs(pkgs.filter((_, i) => i !== idx));
    }
  };
  const handleAdd = (pkg) => {
    setPkgs([pkg, ...pkgs]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Package Management</h1>
        <div className="flex items-center gap-4">
          {/* Modern Toggle Switch */}
         
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded" onClick={() => setShowAdd(true)}> <Plus size={18}/> Add New Package</button>
        </div>
      </div>
      <div className="flex gap-6 border-b mb-6">
        {TABS.map((t, i) => (
          <button
            key={t}
            className={`py-2 px-2 border-b-2 text-sm font-semibold transition ${tab === i ? "border-purple-500 text-purple-600" : "border-transparent text-gray-500"}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap gap-4 items-end mb-8">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold mb-1">Search Packages</label>
          <input type="text" className="border rounded px-3 py-2 w-full" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="min-w-[200px]">
          <label className="block text-xs font-semibold mb-1">Category</label>
          <select className="border rounded px-3 py-2 w-full" value={category} onChange={e => setCategory(e.target.value)}>
            <option>All Categories</option>
            <option>Home Cleaning</option>
            <option>Beauty</option>
            <option>Repairs</option>
            <option>Wellness</option>
          </select>
        </div>
        <div className="min-w-[200px]">
          <label className="block text-xs font-semibold mb-1">Status</label>
          <select className="border rounded px-3 py-2 w-full" value={status} onChange={e => setStatus(e.target.value)}>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Popular</option>
            <option>New</option>
          </select>
        </div>

          <button
            type="button"
            aria-pressed={switcher}
            onClick={() => setSwitcher((v) => !v)}
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${switcher ? "bg-gradient-to-r from-teal-400 to-green-400" : "bg-gray-300"}`}
            style={{ minWidth: 64 }}
          >
            <span
              className={`absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold select-none transition-colors duration-300 ${switcher ? "text-white" : "text-gray-500"}`}
              style={{ zIndex: 2 }}
            >
              {switcher ? "on" : "OFF"}
            </span>
            <span
              className={`absolute top-1 left-1 ${switcher ? "translate-x-8" : "translate-x-0"} w-6 h-6 bg-white rounded-full shadow transition-transform duration-300`}
              style={{ zIndex: 3 }}
            />
           </button> 
        <button className="bg-purple-600 text-white px-6 py-2 rounded font-semibold">Apply Filters</button>
      </div>
      <div className={switcher ? "flex flex-wrap gap-6" : "overflow-x-auto"}>
        {switcher ? (
          pkgs.map((pkg, i) => (
            <PackageCard key={i} pkg={pkg} onEdit={() => handleEdit(i)} onDelete={() => handleDelete(i)} />
          ))
        ) : (
          <table className="min-w-full bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="px-4 py-3 font-semibold text-left">Image</th>
                <th className="px-4 py-3 font-semibold text-left">Service Name</th>
                <th className="px-4 py-3 font-semibold text-left">Category</th>
                <th className="px-4 py-3 font-semibold text-left">Price</th>
                <th className="px-4 py-3 font-semibold text-left">Status</th>
                <th className="px-4 py-3 font-semibold text-left">Rating</th>
                <th className="px-4 py-3 font-semibold text-left">Sub-Services</th>
                <th className="px-4 py-3 font-semibold text-left">Description</th>
                <th className="px-4 py-3 font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pkgs.map((pkg, i) => (
                <tr key={i} className="border-b last:border-b-0 hover:bg-gray-50">
                  {/* Image (placeholder) */}
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      {/* Replace with actual image if available */}
                      <span className="text-xs text-gray-400">600×400</span>
                    </div>
                  </td>
                  {/* Service Name */}
                  <td className="px-4 py-3 font-bold">{pkg.title}</td>
                  {/* Category */}
                  <td className="px-4 py-3">{pkg.category || '-'}</td>
                  {/* Price */}
                  <td className="px-4 py-3">
                    {pkg.oldPrice && <span className="line-through text-gray-400 mr-1">₹{pkg.oldPrice}</span>}
                    <span className="font-bold text-blue-600">₹{pkg.price}</span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${pkg.badgeColor}`}>{pkg.badge}</span>
                  </td>
                  {/* Rating */}
                  <td className="px-4 py-3">
                    <span className="text-yellow-500">★</span> {pkg.rating} <span className="text-xs text-gray-400">({pkg.reviews})</span>
                  </td>
                  {/* Sub-Service Count */}
                  <td className="px-4 py-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">{pkg.services}</span>
                  </td>
                  {/* Description */}
                  <td className="px-4 py-3 text-sm text-gray-600">{pkg.desc}</td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(i)} className="px-3 py-1 rounded bg-yellow-400 text-white text-sm font-semibold">Edit</button>
                      <button onClick={() => handleDelete(i)} className="px-3 py-1 rounded bg-red-500 text-white text-sm font-semibold">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {editIdx !== null && (
        <EditPackageModal
          pkg={pkgs[editIdx]}
          onClose={() => setEditIdx(null)}
          onSave={handleSave}
        />
      )}
      {showAdd && (
        <AddPackageModal
          onClose={() => setShowAdd(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
