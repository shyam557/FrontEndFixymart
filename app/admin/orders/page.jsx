"use client";
import React from "react";
import OrderDashboard from "./components/OrderDashboard";

// export default function OrdersPage() {
//   return <OrderDashboard />;
// }

// "use client";
import { Suspense } from "react";
// import OrdersPageContent from "./OrdersPageContent";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
       <OrderDashboard />
    </Suspense>
  );
}
