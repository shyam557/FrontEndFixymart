import React from "react";

const RevenueByCategoryChart = ({ period, onPeriodChange }) => (
  <div className="bg-white rounded-lg p-4 flex-1 min-h-[320px] flex flex-col">
    <div className="flex justify-between items-center mb-2">
      <div className="font-semibold">Revenue by Service Category</div>
      <select value={period} onChange={e => onPeriodChange(e.target.value)} className="border rounded px-2 py-1">
        <option value="1m">This Month</option>
        <option value="6m">Last 6 Months</option>
      </select>
    </div>
    <div className="flex-1 flex items-center justify-center bg-gray-200 rounded">
      <span className="text-4xl text-gray-400">1200 × 400</span>
    </div>
  </div>
);

export default RevenueByCategoryChart;
