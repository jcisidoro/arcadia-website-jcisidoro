"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "../ui/file-upload";

export default function AdminEventHandler() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/pages/admin-page"); // Redirect to login if no token
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    router.push("/pages/who-we-are"); // Redirect to login page
  };

  if (!isAuthenticated) return <p>Loading...</p>;

  const handleAddEvent = async () => {
    setLoading(true);
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        date,
        image,
        description,
        description1,
        author,
      }),
    });

    setLoading(false);
    if (response.ok) {
      alert("Event added successfully!");
      setTitle("");
      setDate("");
      setImage("");
      setDescription("");
      setDescription1("");
      setAuthor("");
    } else {
      alert("Error adding event");
    }
  };

  return (
    <div className="relative w-full h-[1200px] lg:h-[1000px] flex flex-col items-center justify-center bg-[#326333]/50">
      <div className="flex flex-col w-full sm:w-[450px] lg:w-[850px] p-4 items-center justify-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
          Add Event
        </h2>
        <div className="flex flex-col lg:flex-row w-full items-center">
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/80 p-4 outline-none w-full lg:w-96 rounded-xl mb-2"
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-white/80 p-4 outline-none w-full lg:w-96 rounded-xl mb-2"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white/80 p-4 outline-none w-full lg:w-96 rounded-xl mb-2"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white/80 p-4 outline-none w-full lg:w-96 rounded-xl mb-2 h-32 resize-none"
              maxLength={500}
            />
            <textarea
              placeholder="Another Description"
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
              className="bg-white/80 p-4 outline-none w-full lg:w-96 rounded-xl mb-2 h-32 resize-none"
              maxLength={500}
            />
          </div>
          <div className="flex w-full  bg-white/80 rounded-xl">
            <FileUpload />
          </div>
        </div>

        <button
          onClick={handleAddEvent}
          className="bg-[#326333] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#326333]/70 mt-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-6 py-2 lg:py-3 bg-[#326333] text-white rounded-md lg:hover:bg-red-600 transition cursor-pointer absolute bottom-10 lg:right-10"
      >
        Logout
      </button>
    </div>
  );
}
