import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

const SERVICE_OPTIONS = [
  "AC Repair",
  "Plumbing",
  "Cleaning",
  "Carpentry",
  "Painting",
  "Electrical",
  "Other"
];

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+92", label: "🇵🇰 +92" },
  { code: "+880", label: "🇧🇩 +880" },
];

export default function AddOrderModal({ onClose, onAdd }) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      customer: "",
      service: "",
      countryCode: "+91",
      phone: "",
      date: "",
      amount: "",
      status: "In Progress",
      image: "",
    },
  });
  const [success, setSuccess] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("image", reader.result);
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    handleImage(file);
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
      handleImage(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = (data) => {
    if (!data.customer || !data.service || !data.phone || !data.countryCode || !data.date || !data.amount) return;
    // Ensure amount always has rupee symbol
    let amount = data.amount.toString().trim();
    if (!amount.startsWith("₹")) {
      amount = `₹${amount}`;
    }
    onAdd({
      id: `#UC-${Math.floor(Math.random()*9000+1000)}`,
      customer: { name: data.customer },
      service: { title: data.service },
      phone: `${data.countryCode} ${data.phone}`.trim(),
      date: data.date,
      amount,
      status: data.status,
      image: data.image,
    });
    setSuccess("Order added successfully!");
    setTimeout(() => {
      setSuccess("");
      onClose();
      reset();
      setImgPreview("");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-0 relative">
        {/* Orange header */}
        <div className="rounded-t-xl bg-[#fa7a1d] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white text-lg font-bold">Add Order</h2>
          <button className="text-white hover:text-gray-200" onClick={onClose}><X size={24} /></button>
        </div>
        <div className="px-8 py-6">
          {success && (
            <div className="mb-3 p-2 bg-green-100 text-green-700 rounded text-center font-semibold">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <div>
                <label className="block text-base font-semibold mb-1 text-sm">Customer Name</label>
                <input {...register("customer", { required: true })} className="border rounded px-3 py-2 w-full" />
                {errors.customer && <span className="text-xs text-red-500">Customer name is required</span>}
              </div>
              <div>
                <label className="block text-base font-semibold mb-1 text-sm">Service</label>
                <select {...register("service", { required: true })} className="border rounded px-3 py-2 w-full">
                  <option value="">Select Service</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.service && <span className="text-xs text-red-500">Service is required</span>}
              </div>
              <div>
                <label className="block text-base font-semibold mb-1 text-sm">Total Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    {...register("amount", { required: true })}
                    className="border rounded pl-8 pr-3 py-2 w-full"
                    min="0"
                  />
                </div>
                {errors.amount && <span className="text-xs text-red-500">Amount is required</span>}
              </div>
              <div>
                <label className="block text-base font-semibold mb-1 text-sm">Phone No.</label>
                <div className="flex">
                  <select
                    {...register("countryCode", { required: true })}
                    className="border rounded-l px-2 py-2 bg-gray-50 text-sm focus:outline-none"
                    style={{ minWidth: 80 }}
                    defaultValue="+91"
                  >
                    {COUNTRY_CODES.map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </select>
                  <input
                    {...register("phone", {
                      required: true,
                      pattern: { value: /^[0-9]{7,12}$/, message: "Enter valid phone number" }
                    })}
                    className="border-t border-b border-r rounded-r px-3 py-2 w-full"
                    placeholder="9876543210"
                    maxLength={12}
                  />
                </div>
                {errors.phone && <span className="text-xs text-red-500">{errors.phone.message || "Phone No. is required"}</span>}
              </div>
              <div>
                <label className="block text-base font-semibold mb-1 text-sm">Status</label>
                <select {...register("status")}
                  className="border rounded px-3 py-2 w-full">
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-semibold mb-1 text-sm">Date & Time</label>
                <input type="datetime-local" {...register("date", { required: true })} className="border rounded px-3 py-2 w-full" />
                {errors.date && <span className="text-xs text-red-500">Date & Time is required</span>}
              </div>
            </div>
            {/* Drag and drop image upload */}
            <div className="mb-4">
              <div className="text-center font-semibold mb-2 text-sm">Upload your files here</div>
              <div
                className={`border-2 border-dashed rounded-lg px-4 py-8 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${dragActive ? 'border-orange-400 bg-orange-50' : 'border-blue-300 bg-blue-50'}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current && inputRef.current.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                {imgPreview ? (
                  <img src={imgPreview} alt="Preview" className="w-20 h-20 rounded object-cover mb-2" />
                ) : (
                  <>
                    <div className="text-3xl text-gray-400 mb-2 ">📷</div>
                    <div className="font-semibold text-gray-600 text-xs">Upload a photo</div>
                    <div className="text-xs text-gray-400 text-xs">Drag and drop files here</div>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" className="px-6 py-2 rounded border border-gray-300 text-gray-700 font-semibold bg-white hover:bg-gray-100" onClick={onClose}>Cancel</button>
              <button type="submit" className="px-6 py-2 rounded bg-[#fa7a1d] text-white font-semibold hover:bg-orange-600">Add Order</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}