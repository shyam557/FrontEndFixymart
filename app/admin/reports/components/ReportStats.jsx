import React from "react";

const ReportStats = ({ stats }) => (
  <div className="grid grid-cols-4 gap-4 my-4">
    {stats.map((stat, idx) => (
      <div key={idx} className="bg-white rounded-lg p-6 flex flex-col justify-between shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
          <div className="text-2xl">{stat.icon}</div>
        </div>
        <div className="text-2xl font-bold mb-1">{stat.value}</div>
        <div className={`text-xs flex items-center ${stat.trend > 0 ? 'text-green-600' : 'text-red-500'}`}> 
          {stat.trend > 0 ? '▲' : '▼'} {Math.abs(stat.trend)}% <span className="ml-1 text-gray-400">vs last month</span>
        </div>
      </div>
    ))}
  </div>
);

export default ReportStats;
