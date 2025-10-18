// Centralized navigation helpers for admin panel
import { useRouter, usePathname } from "next/navigation";

export function useAdminRouter() {
  const router = useRouter();
  return router;
}

export function useAdminPathname() {
  return usePathname();
}

export function goTo(router, path) {
  if (router && path) router.push(path);
}
