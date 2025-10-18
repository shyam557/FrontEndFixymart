import React, { useState, useRef } from "react";

const categories = ["Home Appliances", "Beauty", "Home Services"];
const statusOptions = ["Active", "Inactive", "Completed", "Pending"];

export default function EditServiceForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    category: initialData.category || "",
    price: initialData.price || "",
    duration: initialData.duration || "",
    status: initialData.status || "Active",
    image: initialData.image || null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData.image || null);
  const inputRef = useRef(null);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm((prev) => ({ ...prev, image: e.dataTransfer.files[0] }));
      setImagePreview(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleUploadClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-0 w-full max-w-xl mx-auto rounded-2xl overflow-hidden">
      <div className="relative bg-[#fa831c] px-8 py-5 rounded-t-2xl">
        <h2 className="text-lg font-bold text-white text-left">Edit Service</h2>
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
          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
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
              required
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Drag and Drop Image Upload (moved below fields) */}
        <div className="mt-8 mb-6">
          <label className="block text-center mb-2 font-medium">Upload your files here</label>
          <div
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-blue-300 bg-white'}`}
            onClick={handleUploadClick}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{ minHeight: 140 }}
          >
            <input
              type="file"
              name="image"
              accept="image/*"
              ref={inputRef}
              onChange={handleChange}
              className="hidden"
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded mb-2" />
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto text-gray-400 mb-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" /></svg>
                  <span className="font-semibold text-gray-700 text-sm">Upload a photo</span>
                  <span className="text-gray-400 text-sm">Drag and drop files here</span>
                </div>
              </>
            )}
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
            Update Service
          </button>
        </div>
      </div>
    </form>
  );
}
