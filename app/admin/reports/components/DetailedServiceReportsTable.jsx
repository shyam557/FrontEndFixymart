import React from "react";

const DetailedServiceReportsTable = ({ data, onExport }) => (
  <div className="bg-white rounded-lg p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <div className="font-semibold text-lg">Detailed Service Reports</div>
      <button onClick={onExport} className="bg-indigo-600 text-white px-4 py-2 rounded">Export Data</button>
    </div>
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-500 text-sm">
          <th className="py-2">SERVICE</th>
          <th>BOOKINGS</th>
          <th>REVENUE</th>
          <th>ACTIVE PROVIDERS</th>
          <th>AVG. RATING</th>
          <th>COMPLETION RATE</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-t">
            <td className="py-2 flex items-center gap-2"><span className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-xs">40 × 40</span> {row.service}</td>
            <td>{row.bookings}</td>
            <td>{row.revenue}</td>
            <td>{row.providers}</td>
            <td>{row.rating}</td>
            <td>{row.completion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DetailedServiceReportsTable;
