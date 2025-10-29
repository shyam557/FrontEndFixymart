"use client";
import React, { useState, useEffect, useRef } from "react";
import EditOrderModal from "./EditOrderModal";
import AddOrderModal from "./AddOrderModal";

import { fetchAllOrders} from "../../../../src/lib/api/adminApi";

import {
  ClipboardList,
  Search,
  Calendar,
  ChevronDown,
  Eye,
  SquarePen,
  Plus,
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

  // 🔹 Fetch data from API
  useEffect(() => {
    async function fetchOrders() {
      try {
        // const res = await fetch("http://localhost:3002/api/v1/orders");
        const res = await fetchAllOrders();
        const data = res.data;

        console.log("Fetched orders:", data);
        // const data = await res.json();

        // Convert backend format → frontend format
        const formattedOrders = data.map((order) => ({
          orderId: order.id,
          customer: order.customer?.name || "Unknown",
          services: order.service?.subcategory?.category?.name || "N/A",
          phone: order.customer?.phone_number || "N/A",
          dateTime: new Date(order.scheduled_at).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          amount: `₹${order.total_amount}`,
          status:
            order.status.charAt(0).toUpperCase() + order.status.slice(1),
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (
        orderStatusRef.current &&
        !orderStatusRef.current.contains(e.target)
      ) {
        setOrderStatusOpen(false);
      }
      if (
        paymentStatusRef.current &&
        !paymentStatusRef.current.contains(e.target)
      ) {
        setPaymentStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
        <div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
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
                        selectedOrderStatus === opt
                          ? "bg-gray-100 font-semibold"
                          : ""
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
          <button
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mb-1 font-semibold shadow transition-colors"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Order
          </button>
        </div>

        {/* Orders Table */}
        <div className="w-full overflow-x-auto rounded-xl">
          <table className="w-full min-w-[1200px] text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 text-center">User ID</th>
                <th className="px-4 py-3 text-center">Image</th>
                <th className="px-4 py-3 text-left">Services</th>
                <th className="px-4 py-3 text-center">Amount</th>
                <th className="px-4 py-3 text-left">Customer</th>
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
                    selectedOrderStatus === "All" ||
                    order.status === selectedOrderStatus
                )
                .filter((order) => {
                  const q = search.trim().toLowerCase();
                  if (!q) return true;
                  return (
                    order.services.toLowerCase().includes(q) ||
                    order.customer.toLowerCase().includes(q) ||
                    order.orderId.toLowerCase().includes(q)
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
                    <td className="px-4 py-2 text-center">{order.amount}</td>
                    <td className="px-4 py-2 text-left">
                      <a
                        href={order.profileUrl}
                        className="text-blue-600 font-semibold"
                      >
                        {order.customer}
                      </a>
                    </td>
                    <td className="px-4 py-2 text-center">{order.phone}</td>
                    <td className="px-4 py-2 text-center">{order.dateTime}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          statusColors[order.status] ||
                          "bg-gray-100 text-gray-700"
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
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        {editModalOpen && selectedOrder && (
          <EditOrderModal
            order={selectedOrder}
            onClose={() => setEditModalOpen(false)}
            onUpdate={(updatedOrder) => {
              setOrders((prev) =>
                prev.map((o) =>
                  o.orderId === updatedOrder.orderId ? updatedOrder : o
                )
              );
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
