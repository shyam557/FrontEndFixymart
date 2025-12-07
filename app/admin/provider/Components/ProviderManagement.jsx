"use client";

import React, { useState, useEffect } from "react";
import { Eye, Edit, Lock, Trash2 } from "lucide-react";
import AddNewProvider from "./AddNewProvider";
import ProfileDetails from "./ProfileDetails";

const INITIAL_PROVIDERS = [
  {
    id: 1,
    name: "James Henderson",
    role: "Electrician",
    phone: "+1 555-343-2003",
    email: "james@example.com",
    category: "Electrician",
    city: "Aligarh",
    kyc: "Verified",
    status: "Active",
    rating: 4.5,
    avatar: "/uploads/1763918247764-948796361.avif",
    experience: "5+ Years",
    skills: "Electrical Installation, Wiring, Circuit Repair, LED Fitting",
    serviceAreas: "Aligarh, New Delhi",
    bankName: "HDFC Bank",
    accountHolder: "James Henderson",
    accountNumber: "1234567890",
    ifscCode: "HDFC0000123",
    upiId: "james@hdfc",
  },
  {
    id: 2,
    name: "Alice Smith",
    role: "AC Service",
    phone: "+1 555-927-1867",
    email: "alice@example.com",
    category: "AC Service",
    city: "Aligarh",
    kyc: "Pending",
    status: "Inactive",
    rating: 3.2,
    avatar: "/uploads/almari1.avif",
    experience: "3+ Years",
    skills: "AC Installation, Gas Refill, Maintenance, Cooling Repair",
    serviceAreas: "Aligarh",
    bankName: "ICICI Bank",
    accountHolder: "Alice Smith",
    accountNumber: "9876543210",
    ifscCode: "ICIC0000456",
    upiId: "alice@icici",
  },
  {
    id: 3,
    name: "John Davis",
    role: "Plumber",
    phone: "+1 555-937-7485",
    email: "john@example.com",
    category: "Plumber",
    city: "Aligarh",
    kyc: "Verified",
    status: "Active",
    rating: 4.8,
    avatar: "/uploads/carpenter.avif",
    experience: "8+ Years",
    skills:
      "Pipe Installation, Leak Repair, Faucet Replacement, Water Tank Cleaning",
    serviceAreas: "Aligarh, Noida, Greater Noida",
    bankName: "SBI Bank",
    accountHolder: "John Davis",
    accountNumber: "5555666677",
    ifscCode: "SBIN0001234",
    upiId: "john@sbi",
  },
];

// form-related constants moved into the component

export default function ProviderManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  // providers in state so newly added providers appear in the UI
  const [providers, setProviders] = useState(INITIAL_PROVIDERS);

  function handleAddProvider(newProvider) {
    setProviders((prev) => [newProvider, ...prev]);
  }

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    function onDocClick(e) {
      // Only close if clicking outside the menu container
      if (!e.target.closest("[data-menu-container]")) {
        setOpenMenuId(null);
      }
    }
    if (openMenuId) {
      document.addEventListener("click", onDocClick);
      return () => document.removeEventListener("click", onDocClick);
    }
  }, [openMenuId]);

  // keep only modal open state on the page; form state is handled inside AddNewProvider
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // render AddNewProvider modal controlled by page state

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Provider Management
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center mt-1 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            >
              Add Provider
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            {/* Filters */}
            <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:gap-4">
              <div className="w-full md:w-2/5 lg:w-1/3">
                <input
                  type="search"
                  placeholder="Search by name, phone, city..."
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="mt-3 md:mt-0 flex gap-4 items-center flex-wrap">
                <select className="border rounded-md px-4 py-2 text-sm bg-white">
                  <option>Category</option>
                  <option>AC Services</option>
                  <option>Plumber</option>
                  <option>Electrician</option>
                  <option>Cleaning</option>
                  <option>Painter</option>
                  <option>Carpenter</option>
                </select>
                <select className="border rounded-md px-3 py-2 text-sm bg-white">
                  <option>City</option>
                  <option>Aligarh</option>
                  <option>Atrauli</option>
                  <option>Hatras</option>
                </select>
                {/* Grid/Table Toggle Buttons */}
                <div className="flex gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm border focus:outline-none ${
                      viewMode === "grid"
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("table")}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm border focus:outline-none ${
                      viewMode === "table"
                        ? "bg-white text-gray-800 border-blue-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <rect x="3" y="6" width="18" height="2" rx="1" />
                      <rect x="3" y="11" width="18" height="2" rx="1" />
                      <rect x="3" y="16" width="18" height="2" rx="1" />
                    </svg>
                    Table
                  </button>
                </div>
                <select className="border rounded-md px-3 py-2 text-sm bg-white">
                  <option>KYC Status</option>
                  <option>Verified</option>
                  <option>Pending</option>
                </select>
                <select className="border rounded-md px-3 py-2 text-sm bg-white">
                  <option>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <button className="p-2 border rounded-lg bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden divide-y">
              {providers.map((p) => (
                <div
                  key={p.id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 text-sm">
                        {p.name}
                      </div>
                      <div className="text-xs text-gray-500">{p.role}</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.kyc === "Verified"
                          ? "bg-green-100 text-green-800"
                          : p.kyc === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.kyc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table or Grid (toggle) */}
            <div className="hidden sm:block p-4">
              {viewMode === "table" ? (
                <table className="w-full table-auto divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                        Profile
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                        Provider Name
                      </th>
                      <th className="px-8 py-3 text-left text-sm font-medium text-gray-500">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                        KYC Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {providers.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                            <img
                              src={p.avatar}
                              alt={p.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>

                        <td className="px-6 py-2 whitespace-nowrap text-sm align-middle">
                          <div className="font-medium text-gray-900">
                            {p.name}
                          </div>
                          <div className="text-xs text-gray-500">{p.role}</div>
                        </td>

                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                          {p.phone}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                          {p.email}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                          {p.category}
                        </td>

                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                          {p.city}
                        </td>

                        <td className="px-6 py-2 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              p.kyc === "Verified"
                                ? "bg-green-100 text-green-800"
                                : p.kyc === "Pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {p.kyc}
                          </span>
                        </td>

                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
                          {p.status}
                        </td>

                        <td className="px-6 py-2 whitespace-nowrap text-center relative">
                          <div
                            className="relative inline-block"
                            data-menu-container
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(
                                  openMenuId === p.id ? null : p.id
                                );
                              }}
                              className="text-gray-700 hover:text-black font-bold text-xl"
                            >
                              ⋯
                            </button>
                            {openMenuId === p.id && (
                              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <ul className="py-2">
                                  <li
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-700"
                                    onClick={() => {
                                      setSelectedProvider(p);
                                      setIsProfileDetailsOpen(true);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    <Eye className="w-4 h-4" />{" "}
                                    <span className="text-sm font-medium">
                                      View Profile
                                    </span>
                                  </li>
                                  <li
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-700"
                                    onClick={() => {
                                      console.log("edit", p);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />{" "}
                                    <span className="text-sm font-medium">
                                      Edit Profile
                                    </span>
                                  </li>
                                  <li
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-700"
                                    onClick={() => {
                                      console.log("password", p);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    <Lock className="w-4 h-4" />{" "}
                                    <span className="text-sm font-medium">
                                      Change Password
                                    </span>
                                  </li>
                                  <li
                                    className="border-t border-gray-200 px-4 py-3 hover:bg-red-50 cursor-pointer flex items-center gap-3 text-red-600"
                                    onClick={() => {
                                      setProviders((prev) =>
                                        prev.filter((x) => x.id !== p.id)
                                      );
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />{" "}
                                    <span className="text-sm font-medium">
                                      Delete User
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {providers.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-lg shadow p-6 text-center"
                    >
                      <div className="h-24 w-24 mx-auto rounded-full overflow-hidden mb-4">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-lg font-semibold">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.role}</div>
                      <div className="text-sm text-gray-500">{p.city}</div>
                      <div className="flex items-center justify-center gap-3 mt-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1 text-yellow-500">
                          ★{" "}
                          <span className="text-gray-800">
                            {p.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <button className="mt-4 px-4 py-2 border rounded-md">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* AddNewProvider modal */}
        <AddNewProvider
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAdd={handleAddProvider}
        />

        {/* Profile Details Modal */}
        <ProfileDetails
          isOpen={isProfileDetailsOpen}
          onClose={() => setIsProfileDetailsOpen(false)}
          provider={selectedProvider}
        />
      </div>
    </>
  );
}