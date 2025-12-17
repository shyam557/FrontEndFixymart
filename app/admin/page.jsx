"use client";

import React, { useEffect } from "react";
import AdminDashboard from "./dashboard/dashboard";
import { Suspense } from "react";
import { checkLogIn, isAdmin } from "../../src/lib/auth/auth";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const validate = async () => {

      // // Check if user is admin
      // const userIsAdmin = isAdmin();
      // if (!userIsAdmin) {
      //   router.replace("/auth/login");
      //   return;
      // }
      // console.log("User is admin, access granted to admin page."+userIsAdmin);

    };

    validate();
  }, [router]);

  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
