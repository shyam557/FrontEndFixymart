"use client";
import UsersPage from "./UsersPage.jsx";
// import  UsersPage from "UsersPage";
import { Suspense } from "react";

export default function Users() {
  return (
	<Suspense fallback={<div>Loading orders...</div>}>
	  <UsersPage/>
	</Suspense>
  );
}
