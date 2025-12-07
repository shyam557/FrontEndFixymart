"use client";

import {
  Users,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  CheckCircle,
  Clock,
  CreditCard,
  Star,
} from "lucide-react";

export default function SummaryCards({ data, onTotalProvidersClick }) {
  const cards = [
    {
      icon: Users,
      label: "Total Providers",
      value: data.totalProviders.toLocaleString(),
      color: "bg-white",
      iconColor: "text-blue-500",
      clickable: true,
    },
    {
      icon: TrendingUp,
      label: "Active Providers",
      value: data.activeProviders.toLocaleString(),
      subLabel: "Fractive",
      color: "bg-white",
      iconColor: "text-emerald-500",
    },
    {
      icon: ShoppingCart,
      label: "Today Bookings",
      value: data.totalBookings.toLocaleString(),
      color: "bg-white",
      iconColor: "text-purple-500",
    },
    {
      icon: DollarSign,
      label: "Total Bookings",
      value: `₹${(data.totalEarnings / 100000).toFixed(1)}L`,
      color: "bg-white",
      iconColor: "text-orange-500",
    },
    {
      icon: CheckCircle,
      label: "Completed Bookings",
      value: data.completedBookings.toLocaleString(),
      color: "bg-white",
      iconColor: "text-cyan-500",
    },
    {
      icon: Clock,
      label: "Pending Ongoing Bookingd",
      value: `₹${(data.pendingAmount / 100000).toFixed(1)}L`,
      color: "bg-white",
      iconColor: "text-amber-500",
    },
    {
      icon: CreditCard,
      label: "Provider Payout, Sam",
      value: `₹${(data.providerPayout / 100000).toFixed(1)}L`,
      color: "bg-white",
      iconColor: "text-pink-500",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: data.averageRating.toFixed(1),
      color: "bg-white",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            onClick={() => card.clickable && onTotalProvidersClick?.()}
            className={`${card.color} rounded-lg p-3 shadow-sm border border-gray-100 ${card.clickable ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {card.label}
                </p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {card.value}
                </p>
                {card.subLabel && (
                  <p className="text-xs text-gray-500 mt-0.5">{card.subLabel}</p>
                )}
              </div>
              <Icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
