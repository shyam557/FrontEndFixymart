"use client";
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { updateOrder } from "../../../../src/lib/api/adminApi";

export default function EditOrderModal({ order, onClose, onUpdate }) {


  const [scheduledAt, setScheduledAt] = useState(order?.scheduledAt || "");
  const [status, setStatus] = useState(order?.status || "confirmed");
  const [totalAmount, setTotalAmount] = useState(order?.totalAmount || "");
  const [specialInstructions, setSpecialInstructions] = useState(order?.specialInstructions || "");

  // address
  const [line1, setLine1] = useState(order?.address?.line1 || "123 Main Street, Apartment 4B");
  const [line2, setLine2] = useState(order?.address?.line2 || "Near City Mall");
  const [city, setCity] = useState(order?.address?.city || "Mumbai");
  const [state, setState] = useState(order?.address?.state || "Maharashtra");
  const [postalCode, setPostalCode] = useState(order?.address?.postalCode || "400001");
  const [lat, setLat] = useState(order?.address?.lat || 19.076);
  const [lng, setLng] = useState(order?.address?.lng || 72.8777);

  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef();

  useEffect(() => {

    console.log("Order data:", order);
    setScheduledAt(order?.scheduledAt || "");
    setStatus(order?.status || "confirmed");
    setTotalAmount(order?.totalAmount || "");
    setSpecialInstructions(order?.specialInstructions || "");
  }, [order]);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!scheduledAt || !totalAmount || !status) {
      setError("Please fill all required fields.");
      return;
    }

    const body = {
      scheduledAt: new Date(scheduledAt).toISOString(),
      address: {
        line1,
        line2,
        city,
        state,
        postalCode,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      status,
      totalAmount: parseInt(totalAmount),
      specialInstructions:
        specialInstructions || "Please call before arriving. Ring the bell twice.",
    };

    try {
      const res = await updateOrder(order.orderId, body);
      if (onUpdate) onUpdate({ ...order, ...body });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to update order. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl min-w-[380px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: "#f57c1f", borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
        >
          <h2 className="text-lg font-bold text-white">Edit Order</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="px-6 pb-6 pt-6" onSubmit={handleSubmit}>
          {success && (
            <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-center font-semibold">
              Order updated successfully!
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-center font-semibold">
              {error}
            </div>
          )}

          {/* Scheduled Time */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Scheduled At</label>
            <input
              type="datetime-local"
              className="border rounded px-3 py-2 w-full"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              required
            />
          </div>

          {/* Address Fields */}
          <div className="space-y-3 mb-4">
            <h3 className="font-semibold text-gray-700">Address</h3>
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Address Line 1"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Address Line 2"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
            />
            <div className="flex gap-3">
              <input
                className="border rounded px-3 py-2 flex-1"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 flex-1"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <input
                className="border rounded px-3 py-2 flex-1"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 flex-1"
                placeholder="Latitude"
                type="number"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 flex-1"
                placeholder="Longitude"
                type="number"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </div>
          </div>

          {/* Amount and Status */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Total Amount</label>
              <input
                type="number"
                className="border rounded px-3 py-2 w-full"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Special Instructions</label>
            <textarea
              className="border rounded px-3 py-2 w-full"
              rows={3}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Please call before arriving. Ring the bell twice."
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Upload Image (optional)</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-400 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16v-4a4 4 0 018 0v4m-4-4v4m-4 4h8a2 2 0 002-2v-4a6 6 0 10-12 0v4a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm">Click to upload image</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleImageUpload(file);
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#f57c1f] hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              Update Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
