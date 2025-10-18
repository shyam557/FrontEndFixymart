import React from "react";

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "On Leave", label: "On Leave" },
];

const regionOptions = [
  { value: "", label: "All Regions" },
  { value: "Havana", label: "Havana" },
  { value: "Varadero", label: "Varadero" },
  { value: "Santiago", label: "Santiago" },
];

export default function AgentFilters({ filters, setFilters, search, setSearch }) {
  return (
    <div className="flex gap-2">
      <select
        className="border rounded px-3 py-2"
        value={filters.status}
        onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <select
        className="border rounded px-3 py-2"
        value={filters.region}
        onChange={(e) => setFilters((f) => ({ ...f, region: e.target.value }))}
      >
        {regionOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
