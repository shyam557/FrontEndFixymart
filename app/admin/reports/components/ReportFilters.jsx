import React from "react";

const ReportFilters = ({ filters, onChange, onGenerate }) => (
  <div className="flex items-center gap-3 mb-4">
    <input type="date" value={filters.from} onChange={e => onChange('from', e.target.value)} className="border rounded px-2 py-1" />
    <span>to</span>
    <input type="date" value={filters.to} onChange={e => onChange('to', e.target.value)} className="border rounded px-2 py-1" />
    <select value={filters.service} onChange={e => onChange('service', e.target.value)} className="border rounded px-2 py-1">
      <option value="">All Services</option>
      <option value="Salon Services">Salon Services</option>
      <option value="Plumbing">Plumbing</option>
      <option value="Electrician">Electrician</option>
      <option value="Carpenter">Carpenter</option>
      <option value="Appliance Repair">Appliance Repair</option>
    </select>
    <button onClick={onGenerate} className="bg-indigo-600 text-white px-4 py-2 rounded">Generate Report</button>
  </div>
);

export default ReportFilters;
