"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./provider/ToastContext";

export default function LogoutButton() {
  const router = useRouter();
  const { showToast } = useToast();
  // const [csrfToken, setCsrfToken] = useState(null);

  // useEffect(() => {
  //   const fetchCsrfToken = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/csrf-token`,
  //         {
  //           credentials: "include",
  //         }
  //       );
  //       const data = await response.json();
  //       setCsrfToken(data.csrfToken);
  //     } catch (error) {
  //       console.error("Error fetching CSRF token", error);
  //     }
  //   };

  //   fetchCsrfToken();
  // }, []);

  // Logout function
  const handleLogout = async () => {
    // if (!csrfToken) {
    //   console.error("CSRF token is missing");
    //   return;
    // }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
        // headers: {
        //   "CSRF-Token": csrfToken,
        // },
      });

      showToast("Logged out successfully!", "success");
      router.replace("/pages/admin-page");
    } catch (err) {
      console.error("Logout failed", err);
      showToast(
        "An error occurred while logging out. Please try again.",
        "error"
      );
    }
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="px-6 py-2 lg:py-3 bg-[#326333] text-white rounded-md lg:hover:bg-red-600 transition-colors duration-300 cursor-pointer absolute bottom-10 right-10"
      >
        Logout
      </button>
    </div>
  );
}
