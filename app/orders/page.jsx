"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchAllOrdersOfUser } from "../../src/lib/api/api";
import {
  ClipboardList,
  Search,
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

  // 🔹 Fetch all orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetchAllOrdersOfUser();
        const data = res;
        const formattedOrders = data.map((order) => ({
          orderId: order.id,
          serviceName: order.service?.subcategory?.category?.name || "N/A",
          image:
            order.service?.image ||
            order.customer?.image ||
            "https://i.pravatar.cc/150?img=8",
          customer: order.customer?.name || "Unknown",
          phone: order.customer?.phone_number || "N/A",
          amount: order.total_amount,
          dateTime: new Date(order.scheduled_at).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status:
            order.status.charAt(0).toUpperCase() + order.status.slice(1),
        }));
        setOrders(formattedOrders);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      }
    }
    fetchOrders();
  }, []);

  // Close dropdowns
  useEffect(() => {
    function handleClick(e) {
      if (
        orderStatusRef.current &&
        !orderStatusRef.current.contains(e.target)
      ) {
        setOrderStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-blue-500" /> Orders
          </h1>
{/* 
          <button
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition-colors"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Order
          </button> */}
        </div>

        {/* 🔍 Search + Filter */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 bg-gray-50 text-sm w-full"
            />
          </div>

          <div className="relative" ref={orderStatusRef}>
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium"
              onClick={() => setOrderStatusOpen((v) => !v)}
            >
              {selectedOrderStatus || "Order Status"}
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
        </div>

        {/* 🌟 Orders Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                order.serviceName.toLowerCase().includes(q) ||
                order.customer.toLowerCase().includes(q)
              );
            })
            .map((order) => (
              <div
                key={order.orderId}
                className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 hover:shadow-lg transition-all duration-200"
              >
                <img
                  src={order.image}
                  alt={order.serviceName}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />

                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {order.serviceName}
                  </h2>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[order.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium text-gray-700">
                    Customer:
                  </span>{" "}
                  {order.customer}
                </p> */}
{/* 
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  {order.phone}
                </p> */}

                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  {order.dateTime}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-blue-600 font-semibold text-base">
                    ₹{order.amount}
                  </span>

                  <div className="flex gap-2">
                    {/* <button
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100"
                      title="View"
                    >
                      <Eye className="w-5 h-5 text-blue-500" />
                    </button> */}
                    {/* <button
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 hover:bg-green-100"
                      title="Edit"
                      onClick={() => {
                        setSelectedOrder(order);
                        setEditModalOpen(true);
                      }}
                    >
                      <SquarePen className="w-5 h-5 text-green-500" />
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* 🧩 Modals */}
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
