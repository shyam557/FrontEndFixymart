import React, { useState, useEffect } from "react";

const allServices = [
  "Plumbing",
  "Cleaning",
  "Electrician",
  "Pest Control",
  "AC Repair",
  "Carpentry",
];

const LocationModal = ({ open, onClose, onSave, initial }) => {
  const [form, setForm] = useState({
    name: "",
    state: "",
    country: "India",
    servicePros: 0,
    localities: 0,
    pincodes: "",
    activationDate: "",
    lastUpdated: "just now",
    services: [],
  });

  useEffect(() => {
    if (initial) setForm(initial);
    else setForm({
      name: "",
      state: "",
      country: "India",
      servicePros: 0,
      localities: 0,
      pincodes: "",
      activationDate: "",
      lastUpdated: "just now",
      services: [],
    });
  }, [initial, open]);

  const handleChange = (key, value) => setForm(f => ({ ...f, [key]: value }));
  const handleServiceToggle = s => setForm(f => ({ ...f, services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s] }));
  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg" onSubmit={handleSubmit}>
        <div className="text-lg font-bold mb-4">{initial ? "Edit Location" : "Add New Location"}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">City Name</label>
            <input className="border rounded px-3 py-2 w-full" value={form.name} onChange={e => handleChange('name', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input className="border rounded px-3 py-2 w-full" value={form.state} onChange={e => handleChange('state', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input className="border rounded px-3 py-2 w-full" value={form.country} onChange={e => handleChange('country', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Service Pros</label>
            <input type="number" className="border rounded px-3 py-2 w-full" value={form.servicePros} onChange={e => handleChange('servicePros', Number(e.target.value))} min={0} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Localities</label>
            <input type="number" className="border rounded px-3 py-2 w-full" value={form.localities} onChange={e => handleChange('localities', Number(e.target.value))} min={0} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pincodes</label>
            <input className="border rounded px-3 py-2 w-full" value={form.pincodes} onChange={e => handleChange('pincodes', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Activation Date</label>
            <input type="date" className="border rounded px-3 py-2 w-full" value={form.activationDate} onChange={e => handleChange('activationDate', e.target.value)} required />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Services</label>
          <div className="flex flex-wrap gap-2">
            {allServices.map(s => (
              <button type="button" key={s} className={`px-3 py-1 rounded border ${form.services.includes(s) ? 'bg-green-100 border-green-400 text-green-800' : 'bg-gray-100 border-gray-300 text-gray-600'}`} onClick={() => handleServiceToggle(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="px-4 py-2 rounded bg-gray-100" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-6 py-2 rounded bg-indigo-600 text-white">{initial ? "Save Changes" : "Add Location"}</button>
        </div>
      </form>
    </div>
  );
};
export default LocationModal;
