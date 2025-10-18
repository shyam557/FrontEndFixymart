import React, { useState } from "react";
import { X } from "lucide-react";

export default function EditPackageModal({ pkg, onClose, onSave }) {
  const [form, setForm] = useState({ ...pkg });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={onClose}><X size={20} /></button>
        <h2 className="text-xl font-bold mb-4">Edit Package</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea name="desc" value={form.desc} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Price</label>
              <input name="price" value={form.price} onChange={handleChange} className="border rounded px-3 py-2 w-full" required type="number" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Old Price</label>
              <input name="oldPrice" value={form.oldPrice || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full" type="number" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Services</label>
              <input name="services" value={form.services} onChange={handleChange} className="border rounded px-3 py-2 w-full" required type="number" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Badge</label>
              <input name="badge" value={form.badge || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Badge Color</label>
              <input name="badgeColor" value={form.badgeColor || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Status</label>
              <input name="status" value={form.status || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Rating</label>
              <input name="rating" value={form.rating} onChange={handleChange} className="border rounded px-3 py-2 w-full" type="number" step="0.1" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Reviews</label>
              <input name="reviews" value={form.reviews} onChange={handleChange} className="border rounded px-3 py-2 w-full" type="number" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="perVisit" checked={!!form.perVisit} onChange={e => setForm(f => ({ ...f, perVisit: e.target.checked }))} />
            <label className="text-sm">Per Visit</label>
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded mt-2">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
