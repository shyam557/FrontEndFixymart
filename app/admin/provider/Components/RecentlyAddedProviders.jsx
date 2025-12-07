"use client";

import { ChevronRight, ClipboardList } from "lucide-react";

export default function RecentlyAddedProviders({ onViewAllClick }) {
  const recentProviders = [
    {
      id: 1,
      name: "James Henderson",
      phone: "+1 555-343-2003",
      category: "Electrician",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      joinedDate: "12 Aug",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Alice Smith",
      phone: "+1 555-927-1867",
      category: "AC Service",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      joinedDate: "11 Aug",
      rating: 3.2,
    },
    {
      id: 3,
      name: "John Davis",
      phone: "+1 555-937-7485",
      category: "Plumber",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      joinedDate: "10 Aug",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      phone: "+1 555-812-3456",
      category: "Painter",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      joinedDate: "09 Aug",
      rating: 4.2,
    },
    {
      id: 5,
      name: "Mike Brown",
      phone: "+1 555-234-5678",
      category: "Carpenter",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      joinedDate: "08 Aug",
      rating: 4.6,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-green-700 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
          <h2 className="text-medium font-bold">Recently Added Providers</h2>
        </div>
        <button 
          onClick={onViewAllClick}
          className="text-white text-sm font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          VIEW ALL <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Provider ID
              </th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Profile
              </th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Provider Name
              </th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Joined Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentProviders.map((provider) => (
              <tr key={provider.id} className="hover:bg-gray-50 transition-colors">
                {/* Provider ID */}
                <td className="px-6 py-3">
                  <span className="text-sm font-semibold text-green-600">{provider.id}</span>
                </td>

                {/* Profile Picture */}
                <td className="px-6 py-3">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </td>

                {/* Provider Name */}
                <td className="px-6 py-3">
                  <span className="text-sm font-medium text-gray-900">{provider.name}</span>
                </td>

                {/* Phone */}
                <td className="px-6 py-3">
                  <span className="text-sm text-gray-600">{provider.phone}</span>
                </td>

                {/* Category */}
                <td className="px-6 py-3">
                  <span className="text-sm text-gray-600">{provider.category}</span>
                </td>

                {/* Joined Date */}
                <td className="px-6 py-3">
                  <span className="text-sm text-gray-600">{provider.joinedDate}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
