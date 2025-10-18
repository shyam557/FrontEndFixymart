"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/header";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";


export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Auto-close sidebar on route/path change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function hanndleClickOutsideEvent(event) {
      if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", hanndleClickOutsideEvent);
    return () => document.removeEventListener("mousedown", hanndleClickOutsideEvent);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#eff3f4] overflow-hidden overflow-y-hidden" style={{ fontFamily: 'Barlow, sans-serif' }}>
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 md:z-40 md:h-screen md:w-64 md:bg-white md:border-r shadow-sm">
        <Sidebar />
      </aside>

      {/* Sidebar (mobile) */}
      <div
        className={`fixed top-0 left-0 z-50 transition-transform duration-300 md:hidden h-screen w-64 bg-white border-r shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-[260px]"
        }`}
        ref={sidebarRef}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
  <main className="flex-1 flex flex-col w-full md:ml-64">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex-1 mt-[64px]">{children}</div>
      </main>
    </div>
  );
}
