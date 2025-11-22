"use client";
export const API_URL = "http://localhost:3002/api/v1"; // your backend base URL
import { getToken } from "../../lib/auth/auth";

// app/admin/users/page.tsx or page.jsx
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";


export async function loginUser(phoneNumber, password,token) {

  console.log("API loginUser called with:", phoneNumber, password, token);
  
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, password, token }),
  });
  return await res.json(); 
}

export async function registerUser(name, email,phoneNumber,  password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email,phoneNumber, "role":"customer", "profileImage":"", password }),
  });
  return await res.json();
}


export async function fetchAllCategories() {

  const res = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  return await res.json();
}

export async function fetchOneCategories(id) {

  const res = await fetch(`${API_URL}/categories?id=${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  return await res.json();
}

export async function fetchCategoryWithAllSubCategories(id) {

  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  return await res.json();
}


export async function fetchOneSubCategoryServices(subcategoryId) {
  const res = await fetch(`${API_URL}/services?subcategoryId=${subcategoryId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  return await res.json();
}



//for create one order
export async function createAnOrder(serviceId,providerId,scheduledAt,line1,line2,city,state,postalCode,lat,lng,totalAmount,specialInstructions  ) {

   const data =JSON.stringify(

      {
  serviceId: serviceId,
  providerId: providerId,
  scheduledAt: scheduledAt,
  address: {
    line1: line1,
    line2: line2,
    city: city,
    state: state,
    postalCode: postalCode,
    lat: lat,
    lng: lng
  },
  totalAmount: totalAmount,
  specialInstructions: specialInstructions
}
  )

  console.log("This is order data",data,getToken());
  

  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`

    },
    body: data,  });
  return await res.json();
}

//fetch orders of a perticular user which get logged in
export async function fetchAllOrdersOfUser() {

  const res = await fetch(`${API_URL}/bookings`, {
    method: "GET",
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(),
  });
  return await res.json();
}
