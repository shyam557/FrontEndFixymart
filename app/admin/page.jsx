"use client";
import React from "react";
import AdminDashboard from './dashboard/dashboard';
import { Suspense } from "react";


export default function admin() {
  return (
  <Suspense fallback={<div>Loading orders...</div>}>
	<AdminDashboard/>
  </Suspense>
  );
}

	// export default function AdminPage() {
	// 	return <AdminDashboard />;
	// }
