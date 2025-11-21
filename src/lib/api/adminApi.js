"use client";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL ?? 'http://localhost:3002/api/v1';

import { getToken, getSessionData } from "../../lib/auth/auth";


// app/admin/users/page.tsx or page.jsx
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function UsersList() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  return <div>Current filter: {filter ?? "none"}</div>;
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}

export async function registerUser(name, email,phoneNumber,role, profileImage, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email,phoneNumber, role, profileImage, password }),
  });
  return await res.json();
} 


export async function fetchAllCategories() {
  console.log("Fetching all categories from", `${API_URL}/categories`);

  const res = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  return await res.json();
}

// export async function deleteCategory(id) {
//   const res = await fetch(`${API_URL}/categories/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//   });
//   return await res.json();
// }
export async function fetchOneCategories(id) {

  const res = await fetch(`${API_URL}/categories?id=${id}`, {
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


export async function fetchAllServices() {
  const res = await fetch(`${API_URL}/services`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  return await res.json();
}

export async function deleteAServices(id) {
  const dta = getSessionData();
  const providerId = dta.user.id;

  const res = await fetch(`${API_URL}/services/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      providerId: providerId,  // 👈 THIS IS THE IMPORTANT FIX
    }),
  });

  return await res.json();
}

// New: upload image file (returns { filename, url, path } from backend)
export async function uploadServiceImage(file) {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${API_URL}/services/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      // NOTE: do not set Content-Type; browser will set multipart boundary
    },
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(err.message || 'Image upload failed');
  }
  return await res.json();
}

export async function createOneService(providerId,description,image,customPrice,subcategoryId,isActive,duration) {
// export async function createOneService(providerId,payLoad) {



  console.log("This is data",getToken(),providerId,description,image,customPrice,subcategoryId,isActive,duration);

  const res = await fetch(`${API_URL}/services?providerId=${providerId}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" ,
       "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ description ,customPrice,subcategoryId,isActive ,image, duration}),
    // body: payLoad,
  });
  return await res.json();
}



//for user
export async function fetchAllUsers() {

  const res = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  return await res.json();
}


//for provider
export async function fetchAllProviders() {

  const res = await fetch(`${API_URL}/providers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  return await res.json();
}

export async function createCategory(categoryData) {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      name: categoryData.name,
      description: categoryData.description,
      icon: categoryData.icon,
    }),
  });
     // is_active: categoryData.is_active
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create category');
  }
  
  return await res.json();
}

export async function updateCategory(id,name,description,icon) { 
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      name: name,
      description: description,
      icon: icon,
    }),
  });
      // is_active: categoryData.is_active
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update category');
  }
  
  return await res.json();
}


export async function deleteCategory(id) { 
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({
    
    }),
  });
      // is_active: categoryData.is_active
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete category');
  }
  
  return await res.json();
}



//subcategory api
export async function createSubCategory(subCategoryData) {
  const res = await fetch(`${API_URL}/categories/${subCategoryData.category_id}/subcategories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      name: subCategoryData.name,
      duration: subCategoryData.duration,
      base_price: subCategoryData.base_price,
    }),
  });
      // is_active: categoryData.is_active
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create category');
  }
  
  return await res.json();
}


export async function updateSubCategory(id,name,duration,base_price) { 
  const res = await fetch(`${API_URL}/categories/subcategories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      name: name,
      duration: duration,
      base_price: base_price,
    }),
  });
      // is_active: categoryData.is_active
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update subcategory');
  }
  
  return await res.json();
}


export async function deleteSubCategory(id) { 
  const res = await fetch(`${API_URL}/categories/subcategories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({
    
    }),
  });
      // is_active: categoryData.is_active
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete subcategory');
  }
  
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

//for user
export async function fetchAllOrders() {

  const res = await fetch(`${API_URL}/bookings/all`, {
    method: "GET",
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`

    },
    body: JSON.stringify(),
  });
  return await res.json();
}


//for order update
export async function updateOrder(orderId, orderData) {

  console.log("Updating order:", orderId, orderData); 
  const res = await fetch(`${API_URL}/bookings/${orderId}`, {
    method: "PATCH",
   headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`

    },
    body: JSON.stringify(orderData),
  });
  return await res.json();
}
//for order update
export async function updateOrderStatus(orderId, orderData) {

  console.log("Updating order:", orderId, orderData); 
  const res = await fetch(`${API_URL}/bookings/${orderId}`, {
    method: "PATCH",
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`

    },
    body: JSON.stringify({
      status: orderData.status,
      totalAmount: orderData.totalAmount
    }),
  });
  return await res.json();
}


//set provider for order
export async function updateProviderToOrder(orderId, providerId) {

  console.log("Updating order:", orderId, providerId); 
  const res = await fetch(`${API_URL}/bookings/${orderId}`, {
    method: "PATCH",
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`

    },
    body: JSON.stringify({
      providerId: providerId,
    }),
  });
  return await res.json();
}


