"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUploadDemo } from "../FileUpload";

export default function AdminEventHandler() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);

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

  const handleAddEvent = async () => {
    if (
      !imageFile ||
      !title.trim() ||
      !author.trim() ||
      !date ||
      !description.trim()
    ) {
      alert("Please input necessary fields.");
      return;
    }

    setLoading(true);

    try {
      const fullDate = new Date(date); // Convert the selected date to a Date object
      const currentDateTime = new Date(
        fullDate.setHours(
          new Date().getHours() + 8,
          new Date().getMinutes(),
          0,
          0
        )
      ); // Set current time

      // Prepare form data for image upload
      const formData = new FormData();
      formData.append("image", imageFile);

      // Upload image to backend first
      const imageUploadResponse = await fetch(
        "http://localhost:3100/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!imageUploadResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imageData = await imageUploadResponse.json();
      setImageUrl(imageData.imageUrl);

      const eventData = {
        date: currentDateTime.toISOString(),
        imageUrl: imageData.imageUrl,
        title,
        author,
        description,
      };

      const response = await fetch("http://localhost:3100/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert("Event added successfully!");
        // Clear fields after submission
        setImageFile(null);
        setImageUrl(null);
        setDate("");
        setTitle("");
        setAuthor("");
        setDescription("");
        setResetKey((prev) => prev + 1);
      } else {
        alert("Error adding event");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add event");
    }

    setLoading(false);
  };

  if (!isAuthenticated) return <p>Loading...</p>;

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
              onKeyDown={(e) => e.preventDefault()}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white/80 p-4 outline-none w-full lg:w-96 rounded-xl mb-2 h-32 resize-none"
              maxLength={500}
            />
          </div>
          <div className="flex w-full bg-white/50 rounded-xl">
            <FileUploadDemo
              onChange={(file: File) => setImageFile(file)}
              resetKey={resetKey}
            />
          </div>
        </div>

        <button
          onClick={handleAddEvent}
          className="bg-[#326333] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#326333]/70 mt-4"
          disabled={loading || !imageFile}
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
