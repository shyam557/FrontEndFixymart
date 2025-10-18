"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditOrderModal({ order, onClose, onUpdate }) {
  const [customer, setCustomer] = useState(order?.customer?.name || "");
  // Example service options, replace with your actual list if needed
  const serviceOptions = [
    "AC Repair",
    "Salon at Home",
    "Plumbing",
    "Deep Cleaning",
    "Other"
  ];
  const [service, setService] = useState(order?.service?.title || order?.services || "");
  const [amount, setAmount] = useState(order?.amount || "");
  const [phone, setPhone] = useState(order?.phone || "");
  const [date, setDate] = useState(order?.date || order?.dateTime || "");
  const [status, setStatus] = useState(order?.status || "In Progress");
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = React.useRef();
  const handleImageUpload = (file) => {
    const reader = new window.FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setCustomer(order?.customer?.name || "");
  setService(order?.service?.title || order?.services || "");
    setAmount(order?.amount || "");
    setPhone(order?.phone || "");
    setDate(order?.date || order?.dateTime || "");
    setStatus(order?.status || "In Progress");
    setImagePreview(null);
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer || !service || !date || !amount || !phone) return;
    // Always prefix amount with ₹ if not already present
    let formattedAmount = amount;
    if (typeof formattedAmount === 'string' && !formattedAmount.trim().startsWith('₹')) {
      formattedAmount = `₹${formattedAmount.trim()}`;
    }
    if (typeof formattedAmount === 'number') {
      formattedAmount = `₹${formattedAmount}`;
    }
    onUpdate && onUpdate({
      ...order,
      customer: { name: customer },
      service: { title: service },
      services: service, // for compatibility with table display
      amount: formattedAmount,
      phone,
      date,
      status,
      image: imagePreview || order?.image || null,
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl min-w-[380px] max-h-[90vh] overflow-y-auto p-0 relative" style={{borderRadius: 18}}>
        {/* Orange header bar */}
        <div className="w-full flex items-center justify-between px-6 py-4" style={{background: '#f57c1f', borderTopLeftRadius: 18, borderTopRightRadius: 18}}>
          <h2 className="text-lg font-bold text-white">Edit Order</h2>
          <button type="button" className="text-white hover:text-gray-200" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* ...tab navigation removed... */}
        {/* Form content */}
        <form className="px-6 pb-6 pt-6" onSubmit={handleSubmit}>
          {success && (
            <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-center font-semibold animate-fade-in">Order updated successfully!</div>
          )}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-center">Customer Name</label>
                <input className="border rounded px-3 py-2 w-full" value={customer} onChange={e=>setCustomer(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-center">Service</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={service}
                  onChange={e => setService(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a service</option>
                  {serviceOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-center">Total Amount</label>
                <input type="number" className="border rounded px-3 py-2 w-full" value={amount} onChange={e=>setAmount(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-center">Phone No.</label>
                <input className="border rounded px-3 py-2 w-full" value={phone} onChange={e=>setPhone(e.target.value)} required />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-center">Status</label>
                <select className="border rounded px-3 py-2 w-full" value={status} onChange={e=>setStatus(e.target.value)}>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 text-center">Date & Time</label>
                <input type="datetime-local" className="border rounded px-3 py-2 w-full" value={date} onChange={e=>setDate(e.target.value)} required />
              </div>
            </div>
          </div>
          {/* Drag and drop image upload area */}
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">Upload your files here</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-400 transition-colors"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleImageUpload(file);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16v-4a4 4 0 018 0v4m-4-4v4m-4 4h8a2 2 0 002-2v-4a6 6 0 10-12 0v4a2 2 0 002 2z" /></svg>
              <span className="text-gray-500 font-semibold">Upload a photo</span>
              <span className="text-gray-400 text-xs mt-1">Drag and drop files here</span>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-3 w-20 h-20 object-cover rounded" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={e => {
                const file = e.target.files[0];
                if (file) handleImageUpload(file);
              }}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-[#f57c1f] hover:bg-orange-600 text-white px-4 py-2 rounded">Update Order</button>
          </div>
        </form>
      </div>
    </div>
  );
}
