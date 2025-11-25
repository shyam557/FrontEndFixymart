"use client";
import React, { useState, useEffect } from "react";
import { Search, Calendar, Eye, SquarePen, Users, UserPlus, Package, TrendingUp, Filter } from "lucide-react";
import { fetchAllUsers } from "../../../src/lib/api/adminApi";

function UsersPage() {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers30Days: 0,
    usersWithPackages: 0,
    usersToday: 0,
  });
  const [statusFilter, setStatusFilter] = useState("All");
  const [perPage, setPerPage] = useState(20);

  const formatDateTime = (dateString) => {
    if (!dateString) return "No Date";

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${day} ${month} ${year} at ${time}`;
  };

  useEffect(() => {
    const fetchuserData = async () => {
      try {
        const data = await fetchAllUsers();

        // FIXED DATE FORMAT — Do NOT overwrite all date/time
        const enrichedData = data.map((user) => ({
          ...user,
          date: user.created_at ? formatDateTime(user.created_at) : "No Date",
          createdAt: user.created_at ? new Date(user.created_at) : null,
        }));

        // Calculate statistics
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const totalUsers = enrichedData.length;
        const newUsers30Days = enrichedData.filter(
          (user) => user.createdAt && new Date(user.createdAt) >= thirtyDaysAgo
        ).length;
        const usersWithPackages = enrichedData.filter((user) => user.hasPackage).length;
        const usersToday = enrichedData.filter(
          (user) => user.createdAt && new Date(user.createdAt) >= todayStart
        ).length;

        setStats({
          totalUsers,
          newUsers30Days,
          usersWithPackages,
          usersToday,
        });

        setUserData(enrichedData);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchuserData();
  }, []);

  if (loading) return <p className="text-gray-400 italic">Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-2 sm:p-4 md:p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Users Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium text-sm">TOTAL USERS</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-2">All registered accounts</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* New Users (30 Days) Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">NEW USERS (30 DAYS)</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.newUsers30Days.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-2">Recently joined members</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Users with Packages Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">USERS WITH PACKAGES</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.usersWithPackages.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-2">Purchased at least one package</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Package className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Users Today Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">USERS TODAY</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.usersToday.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-2">Signed up in the last 24h</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-2 sm:p-4 md:p-6">
        {/* Header + Search (with full-width bottom border) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and track all users</p>
          </div>

          <div className="mt-4 sm:mt-0 w-full sm:w-64">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-gray-50 text-sm w-full"
              />
            </div>
          </div>
        </div>

        {/* Tabs and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
          <div className="flex gap-2 border-b border-gray-200">
            {["All", "Active", "Inactive"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  statusFilter === tab
                    ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">Per page:</span>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="px-3 py-2 border border-gray-200 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Show Filters
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-xl">
          <table className="w-full min-w-full text-xs sm:text-sm">
            <thead className="bg-[#f8fafc] text-gray-700 font-semibold sticky top-0">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-center text-xs">#</th>
                <th className="px-2 sm:px-4 py-2 text-center hidden sm:table-cell text-xs">User ID</th>
                <th className="px-2 sm:px-4 py-2 text-center text-xs">Name</th>
                <th className="px-2 sm:px-4 py-2 text-center hidden md:table-cell text-xs">Username</th>
                <th className="px-2 sm:px-4 py-2 text-center hidden md:table-cell text-xs">Phone</th>
                <th className="px-2 sm:px-4 py-2 text-center hidden xl:table-cell text-xs">Email</th>
                <th className="px-2 sm:px-4 py-2 text-center hidden 2xl:table-cell text-xs">Type</th>
                <th className="px-2 sm:px-4 py-2 text-center hidden lg:table-cell text-xs">Date</th>
                <th className="px-2 sm:px-4 py-2 text-center text-xs">Status</th>
                <th className="px-2 sm:px-4 py-2 text-center text-xs">Action</th>
              </tr>
            </thead>

            <tbody>
              {userData
                .sort((a, b) => {
                  const dateA = a.createdAt ? new Date(a.createdAt) : 0;
                  const dateB = b.createdAt ? new Date(b.createdAt) : 0;
                  return dateB - dateA;
                })
                .filter((user) => {
                  // Search filter
                  const matchesSearch = search.trim() === "" ||
                    (user.name && user.name.toLowerCase().includes(search.trim().toLowerCase()));
                  
                  // Status filter
                  if (statusFilter === "All") return matchesSearch;
                  if (statusFilter === "Active") return matchesSearch && user.status === "Active";
                  if (statusFilter === "Inactive") return matchesSearch && user.status === "Inactive";
                  return matchesSearch;
                })
                .slice(0, perPage)
                .map((user, idx) => (
                  <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-2 text-center text-xs">{idx + 1}</td>
                    <td className="px-2 sm:px-4 py-2 text-center hidden sm:table-cell text-xs">
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center text-xs font-medium">{user.name}</td>
                    <td className="px-2 sm:px-4 py-2 text-center hidden md:table-cell text-xs">{user.username}</td>
                    <td className="px-2 sm:px-4 py-2 text-center hidden md:table-cell text-xs">{user.phone}</td>
                    <td className="px-2 sm:px-4 py-2 text-center hidden xl:table-cell text-xs">{user.email}</td>
                    <td className="px-2 sm:px-4 py-2 text-center hidden 2xl:table-cell text-xs">{user.registerType}</td>
                    <td className="px-2 sm:px-4 py-2 text-center hidden lg:table-cell text-xs">{user.date}</td>

                    <td className="px-2 sm:px-4 py-2 text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                        {user.status}
                      </span>
                    </td>

                    <td className="px-2 sm:px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                        </button>
                        <button className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-green-50 hover:bg-green-100 flex items-center justify-center">
                          <SquarePen className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
