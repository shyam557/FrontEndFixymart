"use client";
const BACKEND_PUBLIC_API_URL = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL 
const NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG 

import { Suspense } from "react";


import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import QueryProvider from "../../QueryProvider";
import { useServices } from "./hooks/useServices";
import AddServiceForm from "./components/AddServiceForm";
import { useAddServiceMutation } from "./api/useAddService.hook";
import EditServiceForm from "./components/EditServiceForm";
import Image from "next/image";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { servicesData } from "./data/servicesData";


import { fetchAllCategories, fetchAllServices, deleteService, fetchAllUsers, fetchAllOrders, updateServiceShowOnTop, fetchTopServices } from "../../../src/lib/api/adminApi";




const sidebarMenu = [
  {
    label: "🛠 Services",
    subMenu: [
      { label: "All Services", key: "all" },
      { label: "Categories & Subcategories", key: "categories" },
      { label: "Pricing & Packages", key: "pricing" },
      { label: "Add New Service", key: "add" },
    ],
  },
];

const categories = ["All", "Home Appliances", "Beauty", "Home Services"];
const statusOptions = ["All", "Active", "Inactive"];

function ServicesPageInner() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("all");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editService, setEditService] = useState(null);


  // Use API hook for services
  // const { data: apiServices, isLoading, error } = useServices();
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState([]);
  const [services, setServices] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalServices: 0,
    todaysNewUsers: 0,
    todaysOrders: 0,
    categoryCounts: {
      acAppliance: 0,
      plumber: 0,
      electrician: 0,
      carpenter: 0,
      cleaning: 0,
      painter: 0,
    },
  });
  const addServiceMutation = useAddServiceMutation();
  const router = useRouter();


  const[fetchCategories,setFetchCategories] = useState([]);
  const[fetchSubCategories,setFetchSubCategories] = useState([]);

  // // Update local state when API data changes
  // useEffect(() => {
  //   if (apiServices) setServices(apiServices);
  // }, [apiServices]);



  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        // fetch all categories and subcategories
        const categoriesData = await fetchAllCategories();

        categoriesData.map((cat) => (
          fetchCategories.push({ id: cat.id, name: cat.description }),
          cat.subcategories.map((subcat) =>
            fetchSubCategories.push({ id: subcat.id, name: subcat.name })
          )
        ));

        // Fetch services, users and orders in parallel
        const [servicesData, usersData, ordersData] = await Promise.all([
          fetchAllServices(),
          fetchAllUsers(),
          fetchAllOrders(),
        ]);

        setServices(servicesData || []);
        setIsLoading(false);
        setError(false);

        // compute statistics
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const totalUsers = Array.isArray(usersData) ? usersData.length : 0;
        const totalOrders = Array.isArray(ordersData) ? ordersData.length : 0;
        const totalServices = Array.isArray(servicesData) ? servicesData.length : 0;

        const todaysNewUsers = Array.isArray(usersData)
          ? usersData.filter((u) => {
              const created = u.created_at ? new Date(u.created_at) : u.createdAt ? new Date(u.createdAt) : null;
              return created && created >= todayStart;
            }).length
          : 0;

        const todaysOrders = Array.isArray(ordersData)
          ? ordersData.filter((o) => {
              const created = o.created_at ? new Date(o.created_at) : o.createdAt ? new Date(o.createdAt) : null;
              return created && created >= todayStart;
            }).length
          : 0;

        // compute counts for specific categories
        const categoryCounts = {
          acAppliance: 0,
          plumber: 0,
          electrician: 0,
          carpenter: 0,
          cleaning: 0,
          painter: 0,
        };

        (servicesData || []).forEach((svc) => {
          const catName = (
            svc.subcategory?.category?.name || svc.subcategory?.name || svc.category || svc.description || ""
          ).toString().toLowerCase();

          if (catName.includes("ac") || catName.includes("appliance") || catName.includes("ac & appliance") ) categoryCounts.acAppliance++;
          if (catName.includes("plumb")) categoryCounts.plumber++;
          if (catName.includes("electric")) categoryCounts.electrician++;
          if (catName.includes("carpent")) categoryCounts.carpenter++;
          if (catName.includes("clean")) categoryCounts.cleaning++;
          if (catName.includes("paint")) categoryCounts.painter++;
        });

        setStats({
          totalUsers,
          totalOrders,
          totalServices,
          todaysNewUsers,
          todaysOrders,
          categoryCounts,
        });
      } catch (err) {
        console.error("Error:", err);
        setIsLoading(false);
        setError(true);
      }
    };

    fetchServicesData();
  }, []);





  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="p-6">
        <div>
          {/* Service Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push('/admin/services/ac')}
              onKeyDown={(e) => { if (e.key === 'Enter') router.push('/admin/services/ac'); }}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-lg"
            >
              <div>
                <p className="text-sm text-gray-500">AC Services</p>
                <p className="text-2xl font-bold text-slate-800">{stats.categoryCounts.acAppliance.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-blue-600">❄️</span>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push('/admin/services/plumber')}
              onKeyDown={(e) => { if (e.key === 'Enter') router.push('/admin/services/plumber'); }}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-lg"
            >
              <div>
                <p className="text-sm text-gray-500">Plumber </p>
                <p className="text-2xl font-bold text-slate-800">{stats.categoryCounts.plumber.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <span className="text-green-600">🚰</span>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push('/admin/services/electrician')}
              onKeyDown={(e) => { if (e.key === 'Enter') router.push('/admin/services/electrician'); }}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-lg"
            >
              <div>
                <p className="text-sm text-gray-500">Electrician </p>
                <p className="text-2xl font-bold text-slate-800">{stats.categoryCounts.electrician.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                <span className="text-yellow-600">⚡</span>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push('/admin/services/carpenter')}
              onKeyDown={(e) => { if (e.key === 'Enter') router.push('/admin/services/carpenter'); }}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-lg"
            >
              <div>
                <p className="text-sm text-gray-500">Carpenter</p>
                <p className="text-2xl font-bold text-slate-800">{stats.categoryCounts.carpenter.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <span className="text-orange-600">🪚</span>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push('/admin/services/cleaning')}
              onKeyDown={(e) => { if (e.key === 'Enter') router.push('/admin/services/cleaning'); }}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-lg"
            >
              <div>
                <p className="text-sm text-gray-500">Cleaning </p>
                <p className="text-2xl font-bold text-slate-800">{stats.categoryCounts.cleaning.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                <span className="text-teal-600">🧹</span>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push('/admin/services/painter')}
              onKeyDown={(e) => { if (e.key === 'Enter') router.push('/admin/services/painter'); }}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-lg"
            >
              <div>
                <p className="text-sm text-gray-500">Painter</p>
                <p className="text-2xl font-bold text-slate-800">{stats.categoryCounts.painter.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <span className="text-purple-600">🎨</span>
              </div>
            </div>
          </div>
          {/* Header block moved below category cards */}
          <div className="bg-white rounded-t-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Recently Services</h1>
                <p className="text-sm text-gray-500 mt-1">Manage and track recently added services</p>
              </div>

              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search services..."
                  className="pl-10 pr-4 py-2 rounded border border-gray-200 focus:outline-none bg-gray-50 text-sm w-full"
                />
                <svg
                  className="absolute left-2 top-2.5 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>

            <div className="border-b border-gray-200 my-4" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {["All", "Active", "Inactive"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setStatus(tab)}
                    className={`px-3 py-2 text-sm font-medium ${status === tab ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1 bg-white">
                  <span className="text-sm text-gray-600">Per page:</span>
                  <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className="px-2 py-1 text-sm bg-white outline-none">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFilters((s) => !s)}
                  className="ml-2 px-3 py-2 border border-gray-200 rounded bg-white text-sm text-gray-700 hover:bg-gray-50"
                >
                  Show Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Services Table */}
        <div className="w-full overflow-x-auto rounded-b-xl bg-white shadow">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-blue-50 text-blue-900 font-semibold">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap text-center">
                  Service ID
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-center">
                  Image
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-left">
                  Service Name
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-left">
                  Category
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-center">
                  Price
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-center">
                  Duration
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-center">
                  Status
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={8} className="text-center py-8">Loading services...</td></tr>
              ) : error ? (
                <tr><td colSpan={8} className="text-center py-8 text-red-500">Error loading services</td></tr>
              ) : (
                services
                  .filter(
                    (svc) => category === "All" || svc.category === category
                  )
                  .filter((svc) => status === "All" || svc.status === status)
                  .map((svc, index) => (
                    <tr
                      key={svc.id}
                      className="border-b last:border-b-0 align-middle"
                    >
                      <td className="px-4 py-2 text-center align-middle">
                        S{String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-4 py-2 text-center align-middle">
                        {svc.image? (
                          <Image
                            src={`${NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG}${svc.image}`}
                            alt={svc.subcategory.name}
                            width={40}
                            height={40}
                            className="rounded object-cover mx-auto"
                          />
                        ) : (
                          <span className="inline-block w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400 mx-auto">
                            IMG{svc.image}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-left align-middle">
                        {svc.description || "-"}
                      </td>
                      <td className="px-4 py-2 text-left align-middle">
                        {svc.subcategory?.category?.name || "-"}
                      </td>
                      <td className="px-4 py-2 text-center align-middle">
                        {svc.custom_price != null ? svc.custom_price : svc.subcategory?.base_price || "-"}
                      </td>
                      <td className="px-4 py-2 text-center align-middle">
                        {svc.subcategory?.duration || "-"}
                      </td>
                      <td className="px-4 py-2 text-center align-middle">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            svc.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {svc.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center align-middle">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100"
                            onClick={() => {
                              setEditService(svc);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit className="w-5 h-5 text-blue-500" />
                          </button>
                          <button
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100"
                            onClick={async () => {
                              if (!window.confirm('Are you sure you want to delete this service?')) return;
                              try {
                                await deleteService(svc.id);
                                // refresh list from backend to keep in sync
                                const latest = await fetchAllServices();
                                setServices(latest);
                              } catch (err) {
                                console.error('Failed to delete service', err);
                                alert('Failed to delete service. See console for details.');
                              }
                            }}
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                              {/* showOnTop toggle */}
                              <button
                                title={svc.showServiceOnTop ? 'Unset Show On Top' : 'Set Show On Top'}
                                className={`flex items-center justify-center w-8 h-8 rounded-lg ${svc.showServiceOnTop ? 'bg-yellow-100 hover:bg-yellow-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                                onClick={async () => {
                                  // optimistic UI update
                                  const old = services;
                                  setServices(prev => prev.map(s => s.id === svc.id ? { ...s, showServiceOnTop: !s.showServiceOnTop } : s));
                                  try {
                                    await updateServiceShowOnTop(svc.id, !svc.showServiceOnTop);
                                  } catch (err) {
                                    console.error('Failed to update showOnTop', err);
                                    alert('Failed to update showOnTop flag');
                                    setServices(old);
                                  }
                                }}
                              >
                                {svc.showServiceOnTop ? (
                                  <svg className="w-4 h-4 text-yellow-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7l3-7z"/></svg>
                                ) : (
                                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7l3-7z"/></svg>
                                )}
                              </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-40">
          <div className="relative w-full max-w-xl mx-auto bg-transparent">
            <div className="relative bg-white rounded-2xl">
              <AddServiceForm
                subcategories={fetchSubCategories}
                onSubmit={async (form) => {
                  try {
                    await addServiceMutation.mutateAsync(form);
                    // Fetch latest services after add
                    const res = await fetchAllServices();
                    // const latest = await res.json();
                    setServices(res);
                  } catch (err) {
                    // Optionally show error
                  }
                  setShowAddModal(false);
                }}
                onCancel={() => setShowAddModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && editService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-40">
          <div className="relative w-full max-w-xl mx-auto bg-transparent">
            <div className="relative bg-white rounded-2xl">
              <EditServiceForm
                initialData={editService}
                onSubmit={(form) => {
                  setServices(prev => prev.map(svc =>
                    svc.id === editService.id
                      ? {
                          ...svc,
                          name: form.name,
                          category: form.category,
                          price: form.price,
                          duration: form.duration,
                          status: form.status,
                          image: form.image
                            ? (typeof form.image === 'string' ? form.image : URL.createObjectURL(form.image))
                            : svc.image,
                        }
                      : svc
                  ));
                  setShowEditModal(false);
                  setEditService(null);
                }}
                onCancel={() => {
                  setShowEditModal(false);
                  setEditService(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  ); // End of component
}


export default function services() {
  return (
  <Suspense fallback={<div>Loading orders...</div>}>
  <ServicesPage/>
  </Suspense>
  );
}
 function ServicesPage() {
  return (
    <QueryProvider>
      <ServicesPageInner />
    </QueryProvider>
  );
}
