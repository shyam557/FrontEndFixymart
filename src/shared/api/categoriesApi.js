import apiWrapper from "../../shared/api/apiWrapper";

export async function getAllCategories() {
  return apiWrapper({
    method: "GET",
    url: "/api/v1/categories",
  });
}

// Auth API functions for live project

export async function registerUser(data) {
  const res = await fetch("http://localhost:3001/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch("http://localhost:3001/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

// Usage example (in your component):
// import { registerUser, loginUser } from "../../shared/api/categoriesApi";
// await registerUser({ name, email, ... });
// await loginUser({ email, password });
