export const API_URL = "http://localhost:3002/api/v1"; // your backend base URL

import { getToken } from "../../lib/auth/auth";


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

export async function createOneService(providerId,description,image,customPrice,subcategoryId,isActive,duration) {
// export async function createOneService(providerId,payLoad) {



  console.log("This is data",getToken(),providerId,description,image,customPrice,subcategoryId,isActive,duration);

  const res = await fetch(`${API_URL}/services?providerId=${providerId}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" ,
       "Authorization": `Bearer ${getToken()}`

    },
    body: JSON.stringify({ description ,customPrice,subcategoryId,isActive }),
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
