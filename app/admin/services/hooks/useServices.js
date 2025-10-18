import { useEffect, useState } from "react";

// Dummy API call - replace with your real API endpoint
export function useServices() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      setIsLoading(true);
      setError(null);
      try {
  // Use backend API endpoint for services
  const res = await fetch("http://localhost:3001/api/v1/services");
  if (!res.ok) throw new Error("Failed to fetch services");
  const json = await res.json();
  setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  return { data, isLoading, error };
}
