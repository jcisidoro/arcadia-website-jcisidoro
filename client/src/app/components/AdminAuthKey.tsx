"use client";
import { useRouter } from "next/navigation";
import { FaKey } from "react-icons/fa";

export default function AdminAuthKey() {
  const router = useRouter();

  const handleAdminClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/check-auth`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        router.push("/components/admin-page-handler");
      } else {
        router.push("/pages/admin-page");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      router.push("/pages/admin-page");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-60">
      <button
        onClick={handleAdminClick}
        className="bg-[#326333] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-all border-1"
      >
        <FaKey className="text-white" />
      </button>
    </div>
  );
}
