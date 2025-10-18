"use client";

import React, { useState, useEffect } from "react";
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


import { fetchAllCategories, fetchAllServices } from "../../../src/lib/api/adminApi";




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
  const addServiceMutation = useAddServiceMutation();


  const[fetchCategories,setFetchCategories] = useState([]);
  const[fetchSubCategories,setFetchSubCategories] = useState([]);

  // // Update local state when API data changes
  // useEffect(() => {
  //   if (apiServices) setServices(apiServices);
  // }, [apiServices]);



  useEffect(() => {
    const fetchServicesData = async () => {


//here fetch all categories and subcategories
        const data = await fetchAllCategories();

          data.map((cat, index) => (
            fetchCategories.push({
              id:cat.id,
              name:cat.description
            }),


            //now add subcategory
            cat.subcategories.map((subcat,index)=>(
                fetchSubCategories.push({
                  id:subcat.id,
                  name:subcat.name
                }),
              )),


        ));

          // console.log("all data",data, fetchCategories ,fetchSubCategories);





      try {
        // const response = await fetch("http://localhost:5000/api/sidebar");
        // if (!response.ok) throw new Error("Failed to fetch userData");

        const data = await fetchAllServices();

        // apiServices=data;

        setServices(data);
        setIsLoading(false);
        // error=false;
        setError(false);
        console.log("Fetched data:", data);

        // setUserData(data);
        // setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        // setError(err.message);
        setIsLoading(false);
        setError(true);

        // isLoading=false;
      }
    };

    fetchServicesData();
  }, []);











  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            All Services
          </h1>
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search services..."
                // value={search}
                // onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-gray-50 text-sm w-full"
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
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 rounded px-3 py-2 text-sm bg-white focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-200 rounded px-3 py-2 text-sm bg-white focus:outline-none"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {/* Add New Service Button */}
            <button
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition-colors text-sm"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4" /> Add New Service
            </button>
          </div>
        </div>
        {/* Services Table */}
        <div className="w-full overflow-x-auto rounded-xl bg-white shadow">
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
                  .map((svc) => (
                    <tr
                      key={svc.id}
                      className="border-b last:border-b-0 align-middle"
                    >
                      <td className="px-4 py-2 text-center align-middle">
                        {svc.id}
                      </td>
                      <td className="px-4 py-2 text-center align-middle">
                        {svc.subcategory?.icon ? (
                          <Image
                            src={svc.subcategory.icon}
                            alt={svc.subcategory.name}
                            width={40}
                            height={40}
                            className="rounded object-cover mx-auto"
                          />
                        ) : (
                          <span className="inline-block w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400 mx-auto">
                            IMG
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
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this service?')) {
                                setServices(prev => prev.filter(item => item.id !== svc.id));
                              }
                            }}
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
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

export default function ServicesPage() {
  return (
    <QueryProvider>
      <ServicesPageInner />
    </QueryProvider>
  );
}
