"use client";
import React, { useState, useEffect, useRef } from "react";
import EditOrderModal from "./EditOrderModal";
import AddOrderModal from "./AddOrderModal";

import {
  fetchAllOrders,
   fetchAllProviders,
  updateProviderToOrder,
} from "../../../../src/lib/api/adminApi";

import {
  ClipboardList,
  Search,
  ChevronDown,
  Eye,
  SquarePen,
  Plus,
  User,
} from "lucide-react";

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Paid: "bg-green-50 text-green-700",
  "Account Balance": "bg-blue-50 text-blue-700",
  Manual: "bg-orange-50 text-orange-700",
  Razorpay: "bg-blue-100 text-blue-700",
  PayPal: "bg-blue-200 text-blue-700",
};

function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [orderStatusOpen, setOrderStatusOpen] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");
  const orderStatusRef = useRef(null);
  const orderStatusOptions = [
    "All",
    "Failed",
    "Pending",
    "Accepted",
    "Completed",
    "Cancelled",
    "Refunded",
  ];

  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const paymentStatusRef = useRef(null);
  const paymentStatusOptions = [
    "All",
    "Cancelled",
    "Pending",
    "Paid",
    "Failed",
    "Refunded",
  ];

  // Providers
  const [providers, setProviders] = useState([]);
  const [providersLoading, setProvidersLoading] = useState(false);
  const [providersError, setProvidersError] = useState(null);

  // Assign provider modal
  const [providerModalOpen, setProviderModalOpen] = useState(false);
  const [selectedOrderForProvider, setSelectedOrderForProvider] = useState(null);
  const [assigning, setAssigning] = useState(false);

  // Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetchAllOrders();
        const data = res.data;

        const formattedOrders = data.map((order) => ({
          orderId: order.id,
          customer: order.customer?.name || "Unknown",
          services: order.service?.subcategory?.category?.name || "N/A",
          phone: order.customer?.phone_number || "N/A",
          provider_name: order.provider?.user?.name || "N/A",
          provider_phone: order.provider?.user?.phone_number || "N/A",
          dateTime: order.scheduled_at
            ? new Date(order.scheduled_at).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A",
          amount: order.total_amount ?? 0,
          status:
            order.status && order.status.length > 0
              ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
              : "Unknown",
          profileUrl: `/admin/users/${order.customer?.id}`,
          image:
            order.customer?.image ||
            order.service?.image ||
            "https://i.pravatar.cc/150?img=8",
        }));

        setOrders(formattedOrders);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      }
    }

    fetchOrders();
  }, []);

  // Fetch providers (for providers panel)
  useEffect(() => {
    const loadProviders = async () => {
      setProvidersLoading(true);
      setProvidersError(null);
      try {
        const res = await fetchAllProviders();
        const data = res.data ?? [];
        // normalize provider data if needed
        const normalized = data.map((p) => ({
          id: p.id,
          name: p.user?.name || p.name || "Unknown",
          phone: p.user?.phone_number || p.phone_number || "-",
          image: p.user?.image || p.image || "https://i.pravatar.cc/100",
          status: p.status || "Unknown",
        }));
        setProviders(normalized);
      } catch (err) {
        console.error("Failed to load providers:", err);
        setProvidersError("Failed to load providers");
        setProviders([]);
      } finally {
        setProvidersLoading(false);
      }
    };

    loadProviders();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (orderStatusRef.current && !orderStatusRef.current.contains(e.target)) {
        setOrderStatusOpen(false);
      }
      if (paymentStatusRef.current && !paymentStatusRef.current.contains(e.target)) {
        setPaymentStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Open provider selection modal for a given order
  const openProviderSelector = (order) => {
    setSelectedOrderForProvider(order);
    setProviderModalOpen(true);
    // We already fetched providers for the providers panel, so no network call here
  };

  // Assign provider to order (calls API & updates UI)
  const assignProvider = async (provider) => {
    if (!selectedOrderForProvider) return;
    setAssigning(true);
    try {
      // Call backend API - updateProviderToOrder(orderId, providerId)
      await updateProviderToOrder(selectedOrderForProvider.orderId, provider.id);

      // Update orders UI
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === selectedOrderForProvider.orderId
            ? { ...order, provider_name: provider.name, provider_phone: provider.phone }
            : order
        )
      );

      // If the selected order in edit modal is the same, update it too
      if (selectedOrder && selectedOrder.orderId === selectedOrderForProvider.orderId) {
        setSelectedOrder((s) => ({ ...s, provider_name: provider.name, provider_phone: provider.phone }));
      }

      setProviderModalOpen(false);
      setSelectedOrderForProvider(null);
    } catch (err) {
      console.error("Failed to assign provider:", err);
      alert("Failed to assign provider. See console for details.");
    } finally {
      setAssigning(false);
    }
  };

  // Optional: refresh providers list (button)
  const refreshProviders = async () => {
    setProvidersLoading(true);
    setProvidersError(null);
    try {
      const res = await fetchAllProviders();
      console.log("Refresh providers response:", res);
      const normalized = (res ?? []).map((p) => ({
        id: p.id,
        name: p.user?.name || p.name || "Unknown",
        phone: p.user?.phone_number || p.phone_number || "-",
        image: p.user?.image || p.image || "https://i.pravatar.cc/100",
        status: p.status || "Unknown",
      }));

      console.log("Normalized providers:", normalized);
      setProviders(normalized);
    } catch (err) {
      console.error("Failed to refresh providers", err);
      setProvidersError("Failed to refresh providers");
    } finally {
      setProvidersLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-blue-500" /> Orders
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-3">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-gray-50 text-sm w-full"
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Filters + Add Button */}
        <div className="flex flex-wrap gap-3 mb-4 items-start justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Order Status */}
            <div className="relative" ref={orderStatusRef}>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium min-w-[120px]"
                onClick={() => setOrderStatusOpen((v) => !v)}
              >
                {selectedOrderStatus || "Order Status"}{" "}
                <ChevronDown className="w-4 h-4" />
              </button>
              {orderStatusOpen && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2">
                  {orderStatusOptions.map((opt) => (
                    <div
                      key={opt}
                      className={`px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm rounded ${
                        selectedOrderStatus === opt ? "bg-gray-100 font-semibold" : ""
                      }`}
                      onClick={() => {
                        setSelectedOrderStatus(opt);
                        setOrderStatusOpen(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Status */}
            <div className="relative" ref={paymentStatusRef}>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium min-w-[140px]"
                onClick={() => setPaymentStatusOpen((v) => !v)}
              >
                Payment Status <ChevronDown className="w-4 h-4" />
              </button>
              {paymentStatusOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2">
                  {paymentStatusOptions.map((opt) => (
                    <div
                      key={opt}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-base rounded transition-colors"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Order Button */}
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mb-1 font-semibold shadow transition-colors"
              onClick={() => setAddModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Order
            </button>
            <button
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
              onClick={refreshProviders}
            >
              <User className="w-4 h-4" />
              Refresh Providers
            </button>
          </div>
        </div>

        {/* Layout: Orders table + Providers panel */}
        <div className="grid grid-cols-3 gap-6">
          {/* Orders Table (2/3 width) */}
          <div className="col-span-2 w-full overflow-x-auto rounded-xl">
            <table className="w-full min-w-[1000px] text-sm">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-3 text-center">User ID</th>
                  <th className="px-4 py-3 text-center">Image</th>
                  <th className="px-4 py-3 text-left">Services</th>
                  <th className="px-4 py-3 text-center">Amount</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-center">Phone No.</th>
                  <th className="px-4 py-3 text-left">Provider</th>
                  <th className="px-4 py-3 text-center">Phone No.</th>
                  <th className="px-4 py-3 text-center">Date & Time</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter(
                    (order) =>
                      selectedOrderStatus === "All" || order.status === selectedOrderStatus
                  )
                  .filter((order) => {
                    const q = search.trim().toLowerCase();
                    if (!q) return true;
                    return (
                      order.services.toLowerCase().includes(q) ||
                      order.customer.toLowerCase().includes(q) ||
                      String(order.orderId).toLowerCase().includes(q)
                    );
                  })
                  .map((order) => (
                    <tr key={order.orderId} className="border-b last:border-b-0">
                      <td className="px-4 py-2 text-center">{order.orderId}</td>
                      <td className="px-4 py-2 text-center">
                        <img
                          src={order.image}
                          alt={order.customer}
                          className="w-10 h-10 rounded object-cover border mx-auto"
                        />
                      </td>
                      <td className="px-4 py-2 text-left">{order.services}</td>
                      <td className="px-4 py-2 text-center">₹{order.amount}</td>
                      <td className="px-4 py-2 text-left">
                        <a href={order.profileUrl} className="text-blue-600 font-semibold">
                          {order.customer}
                        </a>
                      </td>
                      <td className="px-4 py-2 text-center">{order.phone}</td>
                      <td className="px-4 py-2 text-center">{order.provider_name}</td>
                      <td className="px-4 py-2 text-center">{order.provider_phone}</td>
                      <td className="px-4 py-2 text-center">{order.dateTime}</td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            statusColors[order.status] || "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100">
                            <Eye className="w-5 h-5 text-blue-500" />
                          </button>

                          <button
                            className="w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100"
                            onClick={() => {
                              setSelectedOrder(order);
                              setEditModalOpen(true);
                            }}
                          >
                            <SquarePen className="w-5 h-5 text-green-500" />
                          </button>

                          {/* Assign Provider Button */}
                          <button
                            className="w-8 h-8 rounded-lg bg-purple-50 hover:bg-purple-100"
                            onClick={() => openProviderSelector(order)}
                            title="Assign Provider"
                          >
                            <User className="w-5 h-5 text-purple-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Providers Panel (1/3 width) */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4 sticky top-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">Providers</h2>
                <button
                  className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  onClick={refreshProviders}
                >
                  Refresh
                </button>
              </div>

              {providersLoading ? (
                <div className="text-sm text-gray-500">Loading providers...</div>
              ) : providersError ? (
                <div className="text-sm text-red-500">{providersError}</div>
              ) : providers.length === 0 ? (
                <div className="text-sm text-gray-500">No providers found.</div>
              ) : (
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {providers.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-default"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.phone}</div>
                      </div>
                      <div>
                        <button
                          className="text-sm px-3 py-1 bg-blue-50 rounded hover:bg-blue-100"
                          onClick={() => {
                            // quick-assign: if there is a selectedOrderForProvider, assign; otherwise prompt user to click Assign on order
                            if (selectedOrderForProvider) {
                              assignProvider(p);
                            } else {
                              // set last selected order to null so user knows they must click assign on an order
                              alert("Click 'Assign Provider' on an order row first, then pick a provider here OR use the Assign button in the order row.");
                            }
                          }}
                        >
                          Assign
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Assign Provider Modal */}
        {providerModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Select Provider for Order {selectedOrderForProvider?.orderId}</h2>
                <button
                  className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  onClick={() => {
                    setProviderModalOpen(false);
                    setSelectedOrderForProvider(null);
                  }}
                >
                  Close
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {providersLoading ? (
                  <p className="text-gray-500">Loading providers...</p>
                ) : providers.length === 0 ? (
                  <p className="text-gray-500">No providers available</p>
                ) : (
                  providers.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => assignProvider(p)}
                      className="border rounded-lg p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500">{p.phone}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {assigning ? "Assigning..." : "Select"}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4">
                <button
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded"
                  onClick={() => {
                    setProviderModalOpen(false);
                    setSelectedOrderForProvider(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {editModalOpen && selectedOrder && (
          <EditOrderModal
            order={selectedOrder}
            onClose={() => setEditModalOpen(false)}
            onUpdate={(updatedOrder) => {
              setOrders((prev) => prev.map((o) => (o.orderId === updatedOrder.orderId ? updatedOrder : o)));
              setEditModalOpen(false);
            }}
          />
        )}

        {addModalOpen && (
          <AddOrderModal
            onClose={() => setAddModalOpen(false)}
            onAdd={(newOrder) => {
              setOrders((prev) => [newOrder, ...prev]);
              setAddModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default OrderDashboard;
