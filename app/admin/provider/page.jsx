"use client";
import ProviderPage from "./ProviderPage.jsx";
// import  UsersPage from "UsersPage";
import { Suspense } from "react";

export default function Users() {
  return (
	<Suspense fallback={<div>Loading orders...</div>}>
	  <ProviderPage/>
	</Suspense>
  );
}
