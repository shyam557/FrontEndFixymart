"use client";
import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  // agar aapka sidebar fixed width ka hai (maan lo 240px)
  const sidebarWidth = 258;

  return (
    <header
  className="fixed top-0 bg-white border-b border-gray-200 z-30 h-[56px] flex items-center justify-between px-6"
  style={{
    left: `${sidebarWidth}px`,
    width: `calc(100% - ${sidebarWidth + 4}px)` 
  }}
>
      {/* Left: Dashboard */}
      <div className="flex items-center ">
        <span className="text-[#23272E] font-medium text-sm px-12">Dashboard</span>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-6">
        {/* Notification bell */}
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-500" />
          {/* <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 border-2 border-white">
            99+
          </span> */}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A10.003 10.003 0 0112 15c2.21 0 4.236.72 5.879 1.929M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="text-[#23272E] text-sm font-medium">Super Admin</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
