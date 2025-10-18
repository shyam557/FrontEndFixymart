import React from "react";
import { UserPlus, MapPin, Clock } from "lucide-react";

export default function StatsCards({ agents }) {
  // Stats calculation
  const total = agents.length;
  const active = agents.filter((a) => a.status === "Active").length;
  const onLeave = agents.filter((a) => a.status === "On Leave").length;
  const regions = [...new Set(agents.map((a) => a.region))].length;
  // For demo, avg service time static
  const avgServiceTime = "2.5h";

  const stats = [
    { label: "Field Team", value: total, icon: <UserPlus className="w-7 h-7 text-blue-500" /> },
    { label: "Active Technicians", value: active, icon: <UserPlus className="w-7 h-7 text-green-500" /> },
    { label: "Coverage Areas", value: regions, icon: <MapPin className="w-7 h-7 text-purple-500" /> },
    { label: "Avg. Service Time", value: avgServiceTime, icon: <Clock className="w-7 h-7 text-yellow-500" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
          <div>
            <div className="text-lg font-bold">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
