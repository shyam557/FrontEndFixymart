"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkLogIn, isAdmin } from "../../src/lib/auth/auth";

export default function AdminSuspenseWrapper({ children }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const validate = () => {
      const loggedIn = checkLogIn();
      if (!loggedIn) {
        router.replace("/auth/login");
        return;
      }

      const userIsAdmin = isAdmin();
      if (!userIsAdmin) {
        router.replace("/auth/login");
        return;
      }

      setChecking(false);
    };

    validate();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 text-gray-500">Checking admin permissions...</div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      {children}
    </Suspense>
  );
}
