import React from "react";

export default function AgentTable({ agents, setAgents }) {
  const handleSuspend = (id) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status:
                a.status === "Active"
                  ? "On Leave"
                  : a.status === "On Leave"
                  ? "Active"
                  : a.status,
            }
          : a
      )
    );
  };

  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-gray-700">
          <th className="px-4 py-3 text-left">NAME</th>
          <th className="px-4 py-3 text-left">ID</th>
          <th className="px-4 py-3 text-left">SPECIALTY</th>
          <th className="px-4 py-3 text-left">REGION</th>
          <th className="px-4 py-3 text-left">STATUS</th>
          <th className="px-4 py-3 text-left">LAST SERVICE</th>
          <th className="px-4 py-3 text-left">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {agents.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center py-6 text-gray-400">
              No agents found.
            </td>
          </tr>
        )}
        {agents.map((agent) => (
          <tr key={agent.id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-3 flex items-center gap-3">
              <img
                src={agent.avatar || "/avatar1.jpg"}
                alt={agent.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{agent.name}</div>
                {agent.email && <div className="text-xs text-gray-500">{agent.email}</div>}
              </div>
            </td>
            <td className="px-4 py-3">{agent.id}</td>
            <td className="px-4 py-3">{agent.specialty}</td>
            <td className="px-4 py-3">{agent.region}</td>
            <td className="px-4 py-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  agent.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {agent.status}
              </span>
            </td>
            <td className="px-4 py-3">{agent.lastService}</td>
            <td className="px-4 py-3">
              <button className="text-blue-600 hover:underline mr-3" disabled>Edit</button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleSuspend(agent.id)}
              >
                Suspend
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
