"use client";
import React, { useState, useRef } from "react";
import EditOrderModal from "./EditOrderModal";
import AddOrderModal from "./AddOrderModal";
import {
  ClipboardList,
  Search,
  Calendar,
  ChevronDown,
  Eye,
  SquarePen,
  Plus,
} from "lucide-react";

const initialOrders = [
  {
    userId: "U1001",
    customer: "Ramesh Patel",
    services: "AC Repair",
    phone: "+91 9876543210",
    dateTime: "12 Aug 2025, 10:30 am",
    amount: "₹1200",
    status: "Completed",
    profileUrl: "/admin/users/U1001",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    userId: "U1002",
    customer: "Priya Sharma",
    services: "Salon at Home",
    phone: "+91 9123456780",
    dateTime: "11 Aug 2025, 2:15 pm",
    amount: "₹850",
    status: "Pending",
    profileUrl: "/admin/users/U1002",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    userId: "U1003",
    customer: "Amit Joshi",
    services: "Plumbing",
    phone: "+91 9988776655",
    dateTime: "10 Aug 2025, 5:45 pm",
    amount: "₹500",
    status: "Cancelled",
    profileUrl: "/admin/users/U1003",
    image: null,
  },
  {
    userId: "U1004",
    customer: "Neha Rathi",
    services: "Deep Cleaning",
    phone: "+91 9001122334",
    dateTime: "09 Aug 2025, 9:00 am",
    amount: "₹2000",
    status: "Completed",
    profileUrl: "/admin/users/U1004",
    image: "https://i.pravatar.cc/150?img=7",
  },
];

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Paid: "bg-green-50 text-green-700",
  "Account Balance": "bg-blue-50 text-blue-700",
  Manual: "bg-orange-50 text-orange-700",
  Razorpay: "bg-blue-100 text-blue-700",
  PayPal: "bg-blue-200 text-blue-700",
};

function OrderDashboard() {
  // Orders state
  const [orders, setOrders] = useState(initialOrders);
  // Modal and selected order state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  // Search state
  const [search, setSearch] = useState("");

  // Dropdown state for Order Status
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

  // Dropdown state for Payment Status
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

  // Close Payment Status dropdown on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (
        paymentStatusRef.current &&
        !paymentStatusRef.current.contains(e.target)
      ) {
        setPaymentStatusOpen(false);
      }
    }
    if (paymentStatusOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [paymentStatusOpen]);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (
        orderStatusRef.current &&
        !orderStatusRef.current.contains(e.target)
      ) {
        setOrderStatusOpen(false);
      }
    }
    if (orderStatusOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [orderStatusOpen]);

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
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-gray-50 text-sm w-full"
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
        {/* Filters + New Order Button Row */}
        <div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Order Status Dropdown */}
            <div className="relative" ref={orderStatusRef}>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium min-w-[120px]"
                onClick={() => setOrderStatusOpen((v) => !v)}
              >
                {selectedOrderStatus ? selectedOrderStatus : "Order Status"} <ChevronDown className="w-4 h-4" />
              </button>
              {orderStatusOpen && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2">
                  {orderStatusOptions.map((opt) => (
                    <div
                      key={opt}
                      className={`px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm rounded ${selectedOrderStatus === opt ? 'bg-gray-100 font-semibold' : ''}`}
                      tabIndex={0}
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
            {/* ...existing code for other filter buttons... */}
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
                      tabIndex={0}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="flex items-center gap-1 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium">
              Item Types <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium">
              Payment Method <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium">
              <Calendar className="w-4 h-4" /> Pick a date range
            </button>
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mb-1 font-semibol shadow transition-colors"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Order
          </button>
        </div>
        {/* Users Table */}
        <div className="w-full overflow-x-auto rounded-xl">
          <table className="w-full min-w-[1200px] text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap text-center">User ID</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Image</th>
                <th className="px-4 py-3 whitespace-nowrap text-left">Services</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Amount</th>
                <th className="px-4 py-3 whitespace-nowrap text-left">Customer</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Phone No.</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Date & Time</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Status</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter(order => selectedOrderStatus === "All" || order.status === selectedOrderStatus)
                .filter(order => {
                  const q = search.trim().toLowerCase();
                  if (!q) return true;
                  return (
                    (order.services && order.services.toLowerCase().includes(q)) ||
                    (order.userId && order.userId.toLowerCase().includes(q)) ||
                     (order.customer && order.customer.toLowerCase().includes(q)) ||
                    (order.phone && order.phone.toLowerCase().includes(q))
                  );
                })
                .map((order) => (
                  <tr key={order.userId} className="border-b last:border-b-0 align-middle">
                  {/* User ID */}
                  <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap text-center align-middle">{order.userId}</td>
                  {/* Image */}
                  <td className="px-4 py-2 whitespace-nowrap text-center align-middle">
                    {order.image ? (
                      <img
                        src={order.image}
                        alt={order.customer}
                        className="w-10 h-10 rounded object-cover border mx-auto"
                      />
                    ) : (
                      <span className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400 border mx-auto">
                        IMG
                      </span>
                    )}
                  </td>
                  {/* Services */}
                  <td className="px-4 py-2 whitespace-nowrap text-left align-middle">
                    <span>{order.services}</span>
                  </td>
                  {/* Amount */}
                  <td className="px-4 py-2 whitespace-nowrap text-center align-middle">{order.amount}</td>
                  {/* Customer */}
                  <td className="px-4 py-2 whitespace-nowrap text-left align-middle">
                    <a
                      href={order.profileUrl}
                      className="text-blue-600 font-semibold"
                    >
                      {order.customer}
                    </a>
                  </td>
                  {/* Phone No. */}
                  <td className="px-4 py-2 whitespace-nowrap text-center align-middle">{order.phone}</td>
                  {/* Date & Time */}
                  <td className="px-4 py-2 whitespace-nowrap text-center align-middle">{order.dateTime}</td>
                  {/* Status */}
                  <td className="px-4 py-2 whitespace-nowrap text-center align-middle">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  {/* Action */}
                  <td className="px-4 py-2 whitespace-nowrap text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100">
                        <Eye className="w-5 h-5 text-blue-500" />
                      </button>
                      <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100"
                        onClick={() => {
                          setSelectedOrder(order);
                          setEditModalOpen(true);
                        }}
                      >
                        <SquarePen className="w-5 h-5 text-green-500" />
                      </button>
                      {editModalOpen && selectedOrder && (
                        <EditOrderModal
                          order={selectedOrder}
                          onClose={() => setEditModalOpen(false)}
                          onUpdate={(updatedOrder) => {
                            setOrders((prev) =>
                              prev.map((o) =>
                                o.userId === updatedOrder.userId
                                  ? {
                                      ...o,
                                      customer: updatedOrder.customer.name,
                                      services: updatedOrder.services || updatedOrder.service?.title || o.services,
                                      amount: updatedOrder.amount,
                                      phone: updatedOrder.phone,
                                      dateTime: updatedOrder.date,
                                      status: updatedOrder.status,
                                      image: updatedOrder.image || o.image,
                                    }
                                  : o
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
                            setOrders((prev) => [
                              {
                                userId: newOrder.id,
                                customer: newOrder.customer.name,
                                services: newOrder.service.title,
                                amount: newOrder.amount,
                                phone: newOrder.provider?.name || newOrder.phone || "",
                                dateTime: newOrder.date,
                                status: newOrder.status,
                                profileUrl: "#",
                                image: newOrder.customer?.image || null,
                              },
                              ...prev,
                            ]);
                            setAddModalOpen(false);
                          }}
                        />
                      )}
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

export default OrderDashboard;
