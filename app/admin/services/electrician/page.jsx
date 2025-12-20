"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddServiceForm from "../components/AddServiceForm";
import EditServiceForm from "../components/EditServiceForm";
import { fetchAllCategories, fetchAllServices, deleteService, updateService } from "../../../../src/lib/api/adminApi";

const NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG;

export default function ElectricianServicesAdminPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [perPage, setPerPage] = useState(20);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editService, setEditService] = useState(null);

  const mapServiceToEditPayload = (svc) => ({
    id: svc.id,
    name: svc.description || svc.name || "",
    subcategoryId: svc.subcategory?.id ?? svc.subcategoryId ?? svc.subcategory ?? "",
    price: svc.custom_price ?? svc.price ?? svc.base_price ?? "",
    duration: svc.duration ?? svc.subcategory?.duration ?? "",
    status: (svc.is_active ?? (svc.status === "Active")) ? "Active" : "Inactive",
    image: svc.image || null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [cats, allServices] = await Promise.all([
          fetchAllCategories(),
          fetchAllServices(),
        ]);

        // find Electrician category (case-insensitive match)
        const category = (cats || []).find((c) => {
          const name = (c.name || c.description || "").toString().toLowerCase();
          return name.includes("electric") || name.includes("electrician");
        });

        const subs = Array.isArray(category?.subcategories)
          ? category.subcategories.map((s) => ({ id: s.id, name: s.name }))
          : [];

        setSubcategories(subs);

        const subIds = new Set(subs.map((s) => String(s.id)));
        const filtered = (allServices || []).filter((svc) => {
          const subId = svc.subcategory ? String(svc.subcategory.id ?? svc.subcategoryId ?? svc.subcategory) : null;
          const catName = (svc.subcategory?.category?.name || svc.category || "").toString().toLowerCase();
          return (subId && subIds.has(subId)) || catName.includes("electric") || catName.includes("electrician");
        });

        setServices(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load data");
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Electrician — Services Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage Electrician services and packages</p>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-4 pr-4 py-2 rounded border border-gray-200 bg-gray-50 text-sm w-full"
            />
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6 mt-6" />

        {loading ? (
          <p className="text-gray-500">Loading services...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="border-b border-gray-200">
                    { ["All", "Active", "Inactive"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setStatusFilter(tab)}
                        className={`px-3 py-2 text-sm font-medium ${statusFilter === tab ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]" : "text-gray-500 hover:text-gray-700"}`}
                      >{tab}</button>
                    )) }
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Per page:</span>
                <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className="px-3 py-2 border border-gray-200 rounded bg-white text-sm">
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>

                <button type="button" onClick={() => setShowFilters((s) => !s)} className="ml-2 px-3 py-2 border border-gray-200 rounded bg-white text-sm text-gray-700 hover:bg-gray-50">Show Filters</button>

                <button className="ml-2 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold" onClick={() => setShowAddModal(true)}>+ Add New Service</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600 text-xs uppercase bg-[#f8fafc]">
                  <tr>
                    <th className="px-3 py-2">Service ID</th>
                    <th className="px-3 py-2">Image</th>
                    <th className="px-3 py-2">Service Name</th>
                    <th className="px-3 py-2">Subcategory</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Duration</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-3 py-6 text-center text-gray-500">No services found for Electrician.</td>
                    </tr>
                  ) : (
                    services
                      .filter((s) => {
                        const matchesSearch = search.trim() === "" || (s.description || s.name || "").toLowerCase().includes(search.trim().toLowerCase());
                        const matchesStatus = statusFilter === "All" ? true : statusFilter === "Active" ? (s.is_active || s.status === "Active") : !(s.is_active || s.status === "Active");
                        return matchesSearch && matchesStatus;
                      })
                      .slice(0, perPage)
                      .map((s, idx) => (
                        <tr key={s.id || idx} className="border-t align-middle">
                          <td className="px-3 py-3 text-center">S{String(idx + 1).padStart(2, '0')}</td>
                          <td className="px-3 py-3 text-center">
                            {s.image ? (
                              <Image src={`${NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG}${s.image}`} alt={s.subcategory?.name || s.name} width={44} height={44} className="rounded object-cover mx-auto" />
                            ) : (
                              <span className="inline-block w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400 mx-auto">IMG</span>
                            )}
                          </td>
                          <td className="px-3 py-3">{s.description || s.name || "-"}</td>
                          <td className="px-3 py-3">{s.subcategory?.name || s.subcategoryName || "-"}</td>
                          <td className="px-3 py-3 text-center">{s.custom_price ?? s.price ?? s.base_price ?? "-"}</td>
                          <td className="px-3 py-3 text-center">{s.duration || s.subcategory?.duration || "-"}</td>
                          <td className="px-3 py-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.is_active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>{s.is_active ? "Active" : "Inactive"}</span>
                          </td>
                          <td className="px-3 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => { setEditService(mapServiceToEditPayload(s)); setShowEditModal(true); }} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Edit</button>
                              <button onClick={async () => {
                                if (!window.confirm('Delete this service?')) return;
                                try {
                                  await deleteService(s.id);
                                  const all = await fetchAllServices();
                                  const subIds = new Set(subcategories.map((sb) => String(sb.id)));
                                  setServices((all || []).filter((svc) => {
                                    const subId = svc.subcategory ? String(svc.subcategory.id ?? svc.subcategoryId ?? svc.subcategory) : null;
                                    const catName = (svc.subcategory?.category?.name || svc.category || "").toString().toLowerCase();
                                    return (subId && subIds.has(subId)) || catName.includes("electric") || catName.includes("electrician");
                                  }));
                                } catch (err) {
                                  console.error(err);
                                  alert('Failed to delete service');
                                }
                              }} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-2xl p-4">
            <AddServiceForm
              subcategories={subcategories}
              onCancel={() => setShowAddModal(false)}
              onSubmit={async () => {
                try {
                  const all = await fetchAllServices();
                  const subIds = new Set(subcategories.map((s) => String(s.id)));
                  setServices((all || []).filter((svc) => {
                    const subId = svc.subcategory ? String(svc.subcategory.id ?? svc.subcategoryId ?? svc.subcategory) : null;
                    const catName = (svc.subcategory?.category?.name || svc.category || "").toString().toLowerCase();
                    return (subId && subIds.has(subId)) || catName.includes("electric") || catName.includes("electrician");
                  }));
                } catch (err) {
                  console.error(err);
                }
                try { window.dispatchEvent(new Event('services:updated')); } catch (e) {}
                setShowAddModal(false);
              }}
            />
          </div>
        </div>
      )}
      {showEditModal && editService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-2xl p-4">
            <EditServiceForm
              initialData={editService}
              subcategories={subcategories}
              onCancel={() => { setShowEditModal(false); setEditService(null); }}
              onSubmit={async (form) => {
                try {
                  const dto = {
                    description: form.name,
                    subcategoryId: form.subcategoryId,
                    customPrice: Number(form.price),
                    duration: form.duration,
                    isActive: form.status === 'Active',
                    image: form.image,
                  };
                  const updated = await updateService(editService.id, dto);
                  setServices(prev => prev.map(svc => svc.id === editService.id ? updated : svc));
                  setShowEditModal(false);
                  setEditService(null);
                } catch (err) {
                  console.error('Failed to update service', err);
                  alert('Failed to update service: ' + (err.message || ''));
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
