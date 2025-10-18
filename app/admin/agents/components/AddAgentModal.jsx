import React, { useState } from "react";

export default function AddAgentModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    id: "",
    specialty: "",
    region: "",
    status: "Active",
    lastService: new Date().toISOString().slice(0, 10),
    avatar: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Add Team Member</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAdd(form);
          }}
          className="flex flex-col gap-3"
        >
          <input
            className="border rounded px-3 py-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="ID"
            value={form.id}
            onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Specialty"
            value={form.specialty}
            onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Region"
            value={form.region}
            onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
            required
          />
          <div className="flex gap-2">
            <select
              className="border rounded px-3 py-2 flex-1"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
            <input
              type="date"
              className="border rounded px-3 py-2 flex-1"
              value={form.lastService}
              onChange={(e) => setForm((f) => ({ ...f, lastService: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2"
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
}
