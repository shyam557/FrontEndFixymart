"use client";
import React, { useState } from "react";
import GeneralSettings from "./components/GeneralSettings";
import PaymentCommission from "./components/PaymentCommission";
import ServiceCategories from "./components/ServiceCategories";
import NotificationSettings from "./components/NotificationSettings";
import MaintenanceMode from "./components/MaintenanceMode";

export default function SettingsPage() {
  // State for all sections
  const [general, setGeneral] = useState({
    name: "UrbanClap",
    email: "admin@urbanclap.com",
    currency: "INR",
    timezone: "Asia/Kolkata",
    logo: null,
  });
  const [payment, setPayment] = useState({
    commission: 20,
    gateway: "Razorpay",
    instructions: "Payment will be processed within 7 working days. Service providers should ensure their bank details are up to date.",
    methods: [
      { label: "Credit/Debit Cards", enabled: true },
      { label: "UPI Payments", enabled: true },
      { label: "Net Banking", enabled: false },
    ],
  });
  const [categories, setCategories] = useState([
    { id: 1, name: "Home Cleaning", status: "Active" },
    { id: 2, name: "Appliance Repair", status: "Active" },
    { id: 3, name: "Beauty Services", status: "Pending" },
  ]);
  const [notifications, setNotifications] = useState({
    email: [
      { label: "New Booking Alerts", enabled: true },
      { label: "Payment Updates", enabled: true },
      { label: "Service Provider Approvals", enabled: false },
    ],
    sms: [
      { label: "Emergency Alerts", enabled: true },
      { label: "Service Reminders", enabled: false },
    ],
    push: [
      { label: "Promotional Offers", enabled: true },
      { label: "Rating Reminders", enabled: false },
    ],
  });
  const [maintenance, setMaintenance] = useState(false);

  // Handlers
  const handleGeneralChange = (key, value) => setGeneral(g => ({ ...g, [key]: value }));
  const handleLogoChange = e => {
    // For demo, just set file name
    if (e.target.files[0]) setGeneral(g => ({ ...g, logo: e.target.files[0].name }));
  };
  const handlePaymentChange = (key, value) => setPayment(p => ({ ...p, [key]: value }));
  const handlePaymentToggle = idx => setPayment(p => ({ ...p, methods: p.methods.map((m, i) => i === idx ? { ...m, enabled: !m.enabled } : m) }));
  const handleCategoryAdd = () => {
    const name = prompt("Enter new category name:");
    if (name) setCategories(c => [...c, { id: c.length + 1, name, status: "Pending" }]);
  };
  const handleCategoryEdit = cat => {
    const name = prompt("Edit category name:", cat.name);
    if (name) setCategories(c => c.map(x => x.id === cat.id ? { ...x, name } : x));
  };
  const handleCategoryDelete = id => setCategories(c => c.filter(x => x.id !== id));
  const handleNotifToggle = (type, idx) => setNotifications(n => ({ ...n, [type]: n[type].map((x, i) => i === idx ? { ...x, enabled: !x.enabled } : x) }));
  const handleMaintenanceToggle = () => setMaintenance(m => !m);
  const handleSave = () => {
    // Save logic here (API call etc.)
    alert("Settings saved!");
  };

  return (
    <div className="p-6">
      <GeneralSettings data={general} onChange={handleGeneralChange} onLogoChange={handleLogoChange} />
      <PaymentCommission data={payment} onChange={handlePaymentChange} onToggle={handlePaymentToggle} />
      <ServiceCategories categories={categories} onAdd={handleCategoryAdd} onEdit={handleCategoryEdit} onDelete={handleCategoryDelete} />
      <NotificationSettings data={notifications} onToggle={handleNotifToggle} />
      <MaintenanceMode enabled={maintenance} onToggle={handleMaintenanceToggle} />
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={handleSave}>Save All Changes</button>
      </div>
    </div>
  );
}
