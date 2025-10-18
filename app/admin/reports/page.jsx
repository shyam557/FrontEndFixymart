"use client";

import React, { useState } from "react";
import ReportStats from "./components/ReportStats";
import ReportFilters from "./components/ReportFilters";
import BookingsTrendChart from "./components/BookingsTrendChart";
import RevenueByCategoryChart from "./components/RevenueByCategoryChart";
import DetailedServiceReportsTable from "./components/DetailedServiceReportsTable";
import TopProvidersList from "./components/TopProvidersList";
import CustomerSatisfactionMetrics from "./components/CustomerSatisfactionMetrics";

const stats = [
  {
    label: "Total Bookings",
    value: "2,453",
    icon: "📅",
    trend: 12.5,
  },
  {
    label: "Revenue",
    value: "₹4,87,650",
    icon: "💰",
    trend: 8.3,
  },
  {
    label: "Service Providers",
    value: "1,287",
    icon: "👥",
    trend: 5.2,
  },
  {
    label: "Avg. Rating",
    value: "4.6",
    icon: "⭐",
    trend: -0.3,
  },
];

const serviceReports = [
  { service: "Salon Services", bookings: "1,254", revenue: "₹2,87,400", providers: 423, rating: 4.7, completion: "98.5%" },
  { service: "Plumbing", bookings: "387", revenue: "₹93,200", providers: 215, rating: 4.5, completion: "96.2%" },
  { service: "Electrician", bookings: "312", revenue: "₹74,800", providers: 187, rating: 4.4, completion: "95.8%" },
  { service: "Carpenter", bookings: "278", revenue: "₹66,700", providers: 163, rating: 4.3, completion: "94.5%" },
  { service: "Appliance Repair", bookings: "222", revenue: "₹65,550", providers: 145, rating: 4.2, completion: "93.7%" },
];

const topProviders = [
  { name: "Rajesh Kumar", role: "Salon Services, Delhi", rating: 4.9, bookings: 156 },
  { name: "Priya Sharma", role: "Beauty Services, Mumbai", rating: 4.8, bookings: 142 },
  { name: "Vijay Patel", role: "Plumbing, Bangalore", rating: 4.8, bookings: 137 },
];

const satisfactionMetrics = {
  nps: 62,
  resolutionTime: 2.7,
  positiveFeedback: 87,
  complaints: 5.2,
};

export default function ReportsPage() {
  const [filters, setFilters] = useState({ from: "", to: "", service: "" });
  const [search, setSearch] = useState("");
  const [bookingsPeriod, setBookingsPeriod] = useState("6m");
  const [revenuePeriod, setRevenuePeriod] = useState("1m");

  const handleFilterChange = (key, value) => {
    setFilters(f => ({ ...f, [key]: value }));
  };
  const handleGenerate = () => {
    // Add logic to generate report
  };
  const handleExport = () => {
    // Add logic to export data
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports Dashboard</h1>
        <input type="text" className="border rounded px-4 py-2 w-80" placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="font-semibold">Custom Report Generator</div>
          <div className="text-gray-500 text-sm">Generate detailed reports for analysis</div>
        </div>
        <ReportFilters filters={filters} onChange={handleFilterChange} onGenerate={handleGenerate} />
      </div>
      <ReportStats stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BookingsTrendChart period={bookingsPeriod} onPeriodChange={setBookingsPeriod} />
        <RevenueByCategoryChart period={revenuePeriod} onPeriodChange={setRevenuePeriod} />
      </div>
      <DetailedServiceReportsTable data={serviceReports} onExport={handleExport} />
      <div className="flex flex-col md:flex-row gap-6">
        <TopProvidersList providers={topProviders} />
        <CustomerSatisfactionMetrics metrics={satisfactionMetrics} />
      </div>
    </div>
  );
}
