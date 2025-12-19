"use client";

import React, { useState, useEffect } from "react";
import { Eye, Edit, Lock, Trash2 } from "lucide-react";
import AddNewProvider from "./AddNewProvider";
import ProfileDetails from "./ProfileDetails";
import { fetchAllProviders } from "../../../../src/lib/api/adminApi";
import toast from "react-hot-toast";

/* ---------------- DEFAULT HELPERS ---------------- */

const DEFAULT_AVATAR = "/uploads/default-avatar.png";

const mapProviderFromApi = (p) => ({
  id: p?.id ?? crypto.randomUUID(),

  // user
  name: p?.user?.name ?? "Unknown",
  email: p?.user?.email ?? "-",
  phone: p?.user?.phone_number ?? "-",
  avatar: p?.user?.profile_image ?? DEFAULT_AVATAR,

  // service
  role: p?.services?.[0]?.name ?? "Service Provider",
  category: p?.services?.[0]?.category ?? "General",

  // availability
  city: p?.availability?.city ?? "Not Assigned",
  serviceAreas:
    p?.availability?.areas?.join(", ") ?? "Not Assigned",

  // ratings & status
  rating: Number(p?.avg_rating ?? 0),
  kyc: p?.is_approved ? "Verified" : "Pending",
  status: p?.is_approved ? "Active" : "Inactive",

  // extras
  experience: p?.experience ?? "N/A",
  skills:
    p?.services?.map((s) => s.name).join(", ") ?? "N/A",

  // keep original object if needed later
  raw: p,
});

/* ---------------- COMPONENT ---------------- */

export default function ProviderManagementPage() {
  const [providers, setProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  /* ---------------- FETCH PROVIDERS ---------------- */

  useEffect(() => {
    let mounted = true;

    const loadProviders = async () => {
      try {
        setLoadingProviders(true);

        const res = await fetchAllProviders();
        const list = res?.data || res || [];

        const normalized = Array.isArray(list)
          ? list.map(mapProviderFromApi)
          : [];

        if (mounted) setProviders(normalized);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load providers");
      } finally {
        if (mounted) setLoadingProviders(false);
      }
    };

    loadProviders();
    return () => (mounted = false);
  }, []);

  /* ---------------- CLICK OUTSIDE MENU ---------------- */

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("[data-menu-container]")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Provider Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Provider
          </button>
        </div>

        {/* CONTENT */}
        <div className="bg-white rounded-lg shadow p-4">

          {loadingProviders ? (
            <div className="p-10 text-center">Loading providers...</div>
          ) : viewMode === "table" ? (

            /* ---------------- TABLE VIEW ---------------- */

            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Category</th>
                  <th>City</th>
                  <th>KYC</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {providers.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">

                    <td className="p-2">
                      <img
                        src={p.avatar}
                        onError={(e) =>
                          (e.currentTarget.src = DEFAULT_AVATAR)
                        }
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.role}</div>
                    </td>

                    <td className="p-2">{p.phone}</td>
                    <td className="p-2 truncate max-w-xs">{p.email}</td>
                    <td className="p-2">{p.category}</td>
                    <td className="p-2">{p.city}</td>

                    <td className="p-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          p.kyc === "Verified"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {p.kyc}
                      </span>
                    </td>

                    <td className="p-2">{p.status}</td>

                    <td className="p-2 relative" data-menu-container>
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === p.id ? null : p.id)
                        }
                      >
                        ⋯
                      </button>

                      {openMenuId === p.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
                          <div
                            className="p-3 hover:bg-gray-50 flex gap-2 cursor-pointer"
                            onClick={() => {
                              setSelectedProvider(p);
                              setIsProfileDetailsOpen(true);
                              setOpenMenuId(null);
                            }}
                          >
                            <Eye size={16} /> View Profile
                          </div>
                          <div className="p-3 hover:bg-gray-50 flex gap-2 cursor-pointer">
                            <Edit size={16} /> Edit
                          </div>
                          <div className="p-3 hover:bg-gray-50 flex gap-2 cursor-pointer">
                            <Lock size={16} /> Password
                          </div>
                          <div
                            className="p-3 hover:bg-red-50 flex gap-2 text-red-600 cursor-pointer"
                            onClick={() =>
                              setProviders((prev) =>
                                prev.filter((x) => x.id !== p.id)
                              )
                            }
                          >
                            <Trash2 size={16} /> Delete
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          ) : (

            /* ---------------- GRID VIEW ---------------- */

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {providers.map((p) => (
                <div key={p.id} className="border rounded-lg p-6 text-center">
                  <img
                    src={p.avatar}
                    onError={(e) =>
                      (e.currentTarget.src = DEFAULT_AVATAR)
                    }
                    className="h-24 w-24 mx-auto rounded-full"
                  />
                  <div className="mt-3 font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.role}</div>
                  <div className="text-sm">{p.city}</div>
                  <div className="mt-2 text-yellow-500">
                    ★ {p.rating.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      <AddNewProvider
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(p) => setProviders((prev) => [p, ...prev])}
      />

      <ProfileDetails
        isOpen={isProfileDetailsOpen}
        onClose={() => setIsProfileDetailsOpen(false)}
        provider={selectedProvider}
      />
    </div>
  );
}
