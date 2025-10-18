"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, LogOut, PhoneCall } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Package,
  MapPin,
  Settings2,
  Folders,
  Map,
  BadgeIndianRupee
} from "lucide-react";

// Sidebar sections and unique icons for each item, matching screenshot
const sections = [
  {
    title: 'DASHBOARD',
    items: [
      { name: 'Overview', link: '/admin/' },
      { name: 'Analytics', link: '/admin/analytics' },
      // { name: 'Dashboard', link: '/admin/dashboard' },
    ]
  },
  {
    title: 'AGENTS',
    items: [
      { name: 'All Agents', link: '/admin/agents' },
    ]
  },
  {
    title: 'ORDERS',
    items: [
      { name: 'All Orders', link: '/admin/orders' },
      { name: 'Pending', link: '/admin/orders?status=pending' },
      { name: 'Completed', link: '/admin/orders?status=completed' },
    ]
  },
  {
    title: 'SERVICES',
    items: [
      { name: 'All Services', link: '/admin/services' },
      { name: 'Add Service', link: '/admin/services/add' },
    ]
  },
  {
    title: 'FILES',
    items: [
      { name: 'Download Files', link: '/admin/files' },
      { name: 'Download Packages', link: '/admin/packages' },
    ]
  },
  {
    title: 'PAYMENTS',
    items: [
      { name: 'All Sales', link: '/admin/payments' },
    ]
  },
  {
    title: 'REPORTS',
    items: [
      { name: 'All Reports', link: '/admin/reports' },
    ]
  },
  {
    title: 'LOCATIONS',
    items: [
      { name: 'All Locations', link: '/admin/locations' },
    ]
  },
  {
    title: 'USERS',
    items: [
      { name: 'All Users', link: '/admin/users' },
    ]
  },
  {
    title: 'SETTINGS',
    items: [
      { name: 'General Settings', link: '/admin/settings' },
    ]
  },
];


export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper to check if a sidebar link is active
  const isActive = (item) => {
    if (item.link === "/admin/orders?status=pending") {
      return pathname === "/admin/orders" && searchParams.get("status") === "pending";
    }
    if (item.link === "/admin/orders?status=completed") {
      return pathname === "/admin/orders" && searchParams.get("status") === "completed";
    }
    // For all other links, match pathname exactly (ignoring query)
    return pathname === item.link.split("?")[0];
  };

  return (
    <aside className="sticky left-0 top-0 z-40 h-screen w-64 bg-white border-r flex flex-col">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b mb-2">
          {/* <img src="/globe.svg" className="h-8 mr-2" alt="Logo" /> */}
          <span className="text-xl font-bold text-orange-500">quick<span className="text-black">suvidha</span></span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2">
          {sections.map((section) => (
            <div key={section.title} className="mb-4">
              <div className="text-xs font-semibold text-gray-400 mb-2 tracking-widest">{section.title}</div>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className={`flex items-center px-2 py-2 rounded-md text-[15px] font-medium transition ${isActive(item) ? "bg-orange-100 text-orange-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-auto px-4 pb-4">
          <button
            className="flex items-center text-gray-600 hover:text-red-500 text-[15px] font-medium w-full"
            // onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}