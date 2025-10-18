import React from "react";

const CustomerSatisfactionMetrics = ({ metrics }) => (
  <div className="bg-white rounded-lg p-4 flex-1 ml-2">
    <div className="font-semibold mb-2">Customer Satisfaction Metrics</div>
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span>Overall NPS Score</span>
        <span className="font-bold text-indigo-700">{metrics.nps}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-2 bg-indigo-600 rounded" style={{ width: `${metrics.nps / 100 * 100}%` }}></div>
      </div>
      <div className="text-xs text-gray-400 mt-1">0 (Detractors) <span className="float-right">100 (Promoters)</span></div>
    </div>
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span>Average Resolution Time</span>
        <span className="font-bold text-indigo-700">{metrics.resolutionTime} hrs</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-2 bg-indigo-600 rounded" style={{ width: `80%` }}></div>
      </div>
      <div className="text-xs text-green-600 mt-1">Improvement of 15% from last month</div>
    </div>
    <div className="flex gap-2 mt-2">
      <div className="bg-green-50 text-green-700 rounded p-2 flex-1">
        <div className="text-xs">Positive Feedback</div>
        <div className="text-2xl font-bold">{metrics.positiveFeedback}%</div>
        <div className="text-xs text-green-600">+3% from last month</div>
      </div>
      <div className="bg-red-50 text-red-700 rounded p-2 flex-1">
        <div className="text-xs">Complaints</div>
        <div className="text-2xl font-bold">{metrics.complaints}%</div>
        <div className="text-xs text-red-600">-1.1% from last month</div>
      </div>
    </div>
  </div>
);

export default CustomerSatisfactionMetrics;
