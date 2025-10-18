"use client";
import React, { useState } from "react";
import StatsCards from "./components/StatsCards";
import AgentFilters from "./components/AgentFilters";
import AgentTable from "./components/AgentTable";
import AddAgentModal from "./components/AddAgentModal";
import { UserPlus, Download, MapPin, Clock } from "lucide-react";

export default function AgentsDashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({ status: "", region: "" });
  const [search, setSearch] = useState("");
  // Dummy data for agents (matching technician example)
  const [agents, setAgents] = useState([
    {
      id: "TECH-0429",
      name: "Carlos Mendez",
      email: "carlos.mendez@cubacom.cu",
      avatar: "/avatar1.jpg",
      specialty: "Internet/Fiber",
      region: "Havana",
      status: "Active",
      lastService: "Today, 09:42",
    },
    {
      id: "TECH-1073",
      name: "Ana Rodriguez",
      email: "ana.rodriguez@cubacom.cu",
      avatar: "/avatar2.jpg",
      specialty: "TV/Cable",
      region: "Varadero",
      status: "Active",
      lastService: "Yesterday, 15:30",
    },
    {
      id: "TECH-0085",
      name: "Luis Gutierrez",
      email: "luis.gutierrez@cubacom.cu",
      avatar: "/avatar3.jpg",
      specialty: "Supervisor",
      region: "Santiago",
      status: "Active",
      lastService: "2 days ago",
    },
    {
      id: "AGENT-2014",
      name: "Marta Fernandez",
      email: "marta.fernandez@cubacom.cu",
      avatar: "/avatar4.jpg",
      specialty: "Customer Support",
      region: "Havana",
      status: "On Leave",
      lastService: "1 week ago",
    },
  ]);

  // Filtered agents
  const filteredAgents = agents.filter((agent) => {
    const statusMatch = !filters.status || agent.status === filters.status;
    const regionMatch = !filters.region || agent.region === filters.region;
    const searchMatch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.id.toLowerCase().includes(search.toLowerCase());
    return statusMatch && regionMatch && searchMatch;
  });

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Field Staff Dashboard</h1>
      {/* Stats */}
      <StatsCards agents={agents} />
      {/* Actions */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2" onClick={() => setShowAddModal(true)}><UserPlus size={18}/> Add Team Member</button>
        <button className="bg-white border px-4 py-2 rounded flex items-center gap-2"><Download size={18}/> Export</button>
        <div className="flex gap-2 ml-auto">
          <AgentFilters filters={filters} setFilters={setFilters} search={search} setSearch={setSearch} />
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <AgentTable agents={filteredAgents} setAgents={setAgents} />
      </div>
      {/* Map Placeholder */}
      <div className="bg-white rounded-xl shadow mt-8 p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Technician Coverage Map</h2>
          <a href="#" className="text-blue-600 hover:underline text-sm">View Full Map</a>
        </div>
        <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          [Map Placeholder]
        </div>
      </div>
      <AddAgentModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(newAgent) => {
          setAgents([newAgent, ...agents]);
          setShowAddModal(false);
        }}
      />
    </div>
  );
}
