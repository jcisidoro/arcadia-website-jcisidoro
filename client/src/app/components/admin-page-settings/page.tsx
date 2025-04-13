"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../provider/ToastContext";

export default function AdminPageSettings() {
  const { showToast } = useToast();
  const router = useRouter();
  const [, setCheckRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/check-auth`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          showToast("You are not authenticated. Redirecting...", "error");
          router.replace("/pages/admin-page"); // Not authenticated
          return;
        }

        const data = await response.json();

        const userRole = data.user?.role;

        if (!["superAdmin", "adminManager"].includes(userRole)) {
          showToast("You do not have admin access.", "error");
          router.replace("/pages/admin-page");
        } else {
          setIsAuthenticated(true);
          setCheckRole(userRole);
        }
      } catch (err) {
        console.error(err);
        showToast(
          "Error while verifying authentication. Please try again.",
          "error"
        );
        router.replace("/pages/admin-page");
      }
    };

    checkAuth();
  }, [router, showToast]);

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="flex w-full h-[100vh] bg-[#326333]/50">
      AdminPageSettings
    </div>
  );
}
