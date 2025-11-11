"use client";
import { Suspense } from "react";

export default function AdminSuspenseWrapper({ children }) {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      {children}
    </Suspense>
  );
}
