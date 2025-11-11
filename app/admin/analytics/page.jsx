import React from "react";
import AnalyticsStatsCards from "./AnalyticsStatsCards";


import { Suspense } from "react";

export default function analytics() {
  return (
  <Suspense fallback={<div>Loading orders...</div>}>
  <AnalyticsPage/>
  </Suspense>
  );
}
function AnalyticsPage() {
  return (
    <div className="p-4 bg-[#f3f6f8] min-h-screen">
      <AnalyticsStatsCards />
      {/* Add more analytics content here */}
    </div>
  );
}
