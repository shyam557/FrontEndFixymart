"use client";

import React, { useEffect } from "react";
import AdminDashboard from "./dashboard/dashboard";
import { Suspense } from "react";
import { checkLogIn } from "../../src/lib/auth/auth";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const validate = async () => {
      const loggedIn = await checkLogIn();

      if (!loggedIn) {
        router.replace("/admin/login");
      }
    };

    validate();
  }, [router]);

  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
