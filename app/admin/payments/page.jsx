"use client";
import React, { useState } from "react";
import PaymentStats from "./components/PaymentStats";
import PaymentChart from "./components/PaymentChart";
import PaymentMethods from "./components/PaymentMethods";
import PaymentTabs from "./components/PaymentTabs";
import PaymentTable from "./components/PaymentTable";
import PaymentQuickActions from "./components/PaymentQuickActions";

export default function PaymentsDashboard() {
  // Dummy data for stats, chart, methods, table, etc.
  const [tab, setTab] = useState("Monthly");
  const [payments, setPayments] = useState([
    { date: "15 Jan 2023", amount: 12500, status: "Completed" },
    { date: "14 Jan 2023", amount: 8750, status: "Pending" },
    { date: "13 Jan 2023", amount: 25000, status: "Failed" },
    { date: "12 Jan 2023", amount: 24300, status: "Completed" },
  ]);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <PaymentStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Payment Analytics</h2>
            <PaymentTabs tab={tab} setTab={setTab} />
          </div>
          <PaymentChart tab={tab} />
        </div>
        <div className="space-y-6">
          <PaymentMethods />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Recent Payments</h2>
            <a href="#" className="text-blue-600 hover:underline text-sm">View All</a>
          </div>
          <PaymentTable payments={payments} setPayments={setPayments} />
        </div>
        <div className="space-y-6">
          <PaymentQuickActions />
        </div>
      </div>
    </div>
  );
}
