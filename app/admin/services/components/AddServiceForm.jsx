import React, { useState } from "react";

import { createOneService, uploadServiceImage } from "../../../../src/lib/api/adminApi";


const initialState = {

  image: null,
  name: "",
  subcategoryId: "",
  price: "",
  duration: "",
  status: "Active",
};

// Example subcategories, replace with dynamic fetch if needed
// const subcategories = [
//   { id: "1", name: "Plumbing" },
//   { id: "2", name: "AC Repair" },
//   { id: "3", name: "Cleaning" },
// ]; 
const statusOptions = ["Active", "Inactive"];

export default function AddServiceForm({ subcategories, onSubmit, onCancel }) {



  const [form, setForm] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Map frontend fields to backend DTO
    const payload = {
      subcategoryId: form.subcategoryId || '', // You need to select subcategoryId from UI
      customPrice: Number(form.price),
      description: form.name,
      isActive: form.status === 'Active',
    };
    if (!payload.subcategoryId) {
      alert('Please select a subcategory.');
      return;
    }
    if (isNaN(payload.customPrice)) {
      alert('Please enter a valid price.');
      return;
    }

    try {
      let imageUrl = null;
      if (form.image && typeof form.image !== "string") {
        // upload image file first
        const uploadRes = await uploadServiceImage(form.image);
        imageUrl = uploadRes.url || (uploadRes.filename ? `/uploads/${uploadRes.filename}` : null);
      } else if (typeof form.image === "string") {
        imageUrl = form.image;
      }

      // Use provider id (hardcoded now) and send imageUrl
      const data = await createOneService(
        "1ee209c7-333d-426d-976c-8f0c7ce46376",
        form.name,
        imageUrl,
        Math.floor(form.price),
        form.subcategoryId,
        form.status === 'Active',
        form.duration
      );

      console.log("service added successfully", data);
      onSubmit && onSubmit(payload);
    } catch (err) {
      console.error("Failed to create service", err);
      alert("Failed to add service: " + (err.message || ""));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-0 w-full max-w-xl mx-auto rounded-2xl overflow-hidden">
      <div className="relative bg-[#fa831c] px-8 py-5 rounded-t-2xl">
        <h2 className="text-1xl font-bold text-white text-left">Add New Service</h2>
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-5 right-6 text-white text-3xl font-bold hover:text-gray-200 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <div className="p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service Name */}
        <div>
          <label className="block mb-1 font-medium">Service Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
            required
          />
        </div>
        {/* Subcategory */}
        <div>
          <label className="block mb-1 font-medium">Subcategory</label>
          <select
            name="subcategoryId"
            value={form.subcategoryId || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>
        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
            min="0"
            required
          />
        </div>
        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
            placeholder="e.g. 1 hr, 45 min"
            required
          />
        </div>
        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* Image Upload */}
        <div className="col-span-2 flex flex-col items-center mb-2">
          <label className="block w-full text-center mb-2 font-medium">Upload your files here</label>
          <div
            className="w-full border-2 border-dashed border-blue-400 rounded-xl flex flex-col items-center justify-center py-8 mb-2 cursor-pointer transition hover:border-blue-600"
            onClick={() => document.getElementById('service-image-input').click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleImageChange({ target: { files: [file] } });
            }}
          >
            <div className="flex flex-col items-center">
              <svg width="36" height="36" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 16v-8m0 0l-3 3m3-3l3 3" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="3" width="18" height="18" rx="4"/>
              </svg>
              <span className="font-semibold text-gray-500 mt-2 text-sm">Upload a photo</span>
              <span className="text-gray-400 text-sm">Drag and drop files here</span>
            </div>
            <input
              id="service-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded border mt-4" />
            )}
          </div>
        </div>
      </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-[#ff7900] text-white font-semibold hover:bg-orange-600"
          >
            Add Service
          </button>
        </div>
      </div>
    </form>
  );
}
