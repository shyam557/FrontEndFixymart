"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import SummaryCards from "./Components/SummaryCards";
import ProviderPerformance from "./Components/ProviderPerformance";
import ProviderManagement from "./Components/ProviderManagement";
import BookingAnalytics from "./Components/BookingAnalytics";
import EarningsAndPayout from "./Components/EarningsAndPayout";
import ProviderActivityTracking from "./Components/ProviderActivityTracking";
import AddNewProvider from "./Components/AddNewProvider";
import RecentlyAddedProviders from "./Components/RecentlyAddedProviders";

export default function ProviderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showProviderManagement, setShowProviderManagement] = useState(false);

  // Mock data - replace with actual API calls
  const mockProviders = [
    {
      id: 1,
      name: "Kuldeep Vady",
      category: "Electrician",
      phone: "5085688989",
      city: "Mumbai",
      status: "Verified",
      rating: 4.5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kuldeep",
    },
    {
      id: 2,
      name: "Legran Rille",
      category: "Blitter",
      phone: "0483743389",
      city: "Mumbai",
      status: "Verified",
      rating: 4.7,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Legran",
    },
  ];

  const mockSummaryData = {
    totalProviders: 1250,
    activeProviders: 1160,
    totalBookings: 8500,
    totalEarnings: 1000000,
    completedBookings: 7500,
    pendingAmount: 400000,
    providerPayout: 350000,
    averageRating: 4.5,
  };

  const handleAddProvider = (newProvider) => {
    console.log("New provider added:", newProvider);
    setIsModalOpen(false);
    // Add to database
  };

  if (showProviderManagement) {
    return <ProviderManagement />;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header with Title and Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Provider Management</h1>
          <p className="text-gray-600 mt-1">Manage all service providers and track their performance</p>
        </div>
       
      </div>

      {/* Summary Cards */}
      <SummaryCards data={mockSummaryData} onTotalProvidersClick={() => setShowProviderManagement(true)} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Provider Performance */}
          <ProviderPerformance />

          {/* Recently Added Providers */}
          <RecentlyAddedProviders onViewAllClick={() => setShowProviderManagement(true)} />
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Booking Analytics */}
          <BookingAnalytics />

          {/* Earnings & Payout */}
          <EarningsAndPayout />

          {/* Provider Activity Tracking */}
          <ProviderActivityTracking />
        </div>
      </div>

      {/* Add New Provider Modal */}
      <AddNewProvider
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProvider}
      />
    </div>
  );
}