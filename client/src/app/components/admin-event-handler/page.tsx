"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUploadDemo } from "../FileUpload";
import Image from "next/image";
import BackgroundVideo from "../BackgroundVideo";

export default function AdminEventHandler() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [speakers, setSpeakers] = useState("");
  const [attendees, setAttendees] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
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
      !speakers.trim() ||
      !attendees.trim() ||
      !fromDate ||
      !toDate ||
      !description.trim()
    ) {
      alert("Please input necessary fields.");
      return;
    }

    setLoading(true);

    try {
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
        fromDate: new Date(fromDate).toISOString().split("T")[0],
        toDate: new Date(toDate).toISOString().split("T")[0],
        imageUrl: imageData.imageUrl,
        title,
        speakers,
        attendees,
        description,
        description1,
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
        setFromDate("");
        setToDate("");
        setTitle("");
        setSpeakers("");
        setAttendees("");
        setDescription("");
        setDescription1("");
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

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="relative w-full h-[1700px] lg:h-[1000px] flex flex-col items-center justify-center bg-[#326333]/50">
      <div className="flex flex-col w-full h-[900px] lg:h-[700px] sm:w-[450px] md:w-[750px] lg:w-[800px] xl:w-[1050px] p-4 items-center justify-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
          Add Event
        </h2>
        <div className="flex flex-col lg:flex-row w-full h-[1500px] items-center bg-[#326333]/90 rounded-2xl">
          <div className="bg-black/50 w-full lg:w-1/3 h-full flex flex-col items-center justify-center relative rounded-t-2xl lg:rounded-l-2xl">
            <BackgroundVideo
              width="w-[100vw]"
              height="h-full"
              className="rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none"
            />
            <div className="w-40 h-40 relative z-2">
              <Image
                src="/arcadiaLogo1.png"
                alt="Arcadia Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 items-center mb-5 z-1 lg:mx-4 xl:mx-0">
              <h1 className="text-white uppercase text-3xl xl:text-5xl tracking-[0.5rem] font-cormorant font-semibold">
                Arcadia
              </h1>
              <div className="w-full h-0.5 bg-white"></div>
              <p className="text-white text-base xl:text-lg uppercase font-semibold tracking-[0.3rem] text-center">
                Sustainability Hub
              </p>
            </div>
          </div>
          <div className="w-full lg:w-2/3 h-full p-4">
            <div className="flex flex-col lg:flex-row w-full h-full gap-2">
              <div className="flex flex-col w-full h-full">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2"
                />
                <input
                  type="text"
                  placeholder="Speakers"
                  value={speakers}
                  onChange={(e) => setSpeakers(e.target.value)}
                  className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2"
                />
                <input
                  type="text"
                  placeholder="Attendees"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                  className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2"
                />
                <FileUploadDemo
                  onChange={(file: File) => setImageFile(file)}
                  resetKey={resetKey}
                />
              </div>
              <div className="w-full h-full flex flex-col">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2"
                  onKeyDown={(e) => e.preventDefault()}
                />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2"
                  onKeyDown={(e) => e.preventDefault()}
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2 h-32 resize-none"
                />
                <textarea
                  placeholder="Another Description"
                  value={description1}
                  onChange={(e) => setDescription1(e.target.value)}
                  className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2 h-32 resize-none"
                />
                <div className="w-full h-1/4 flex items-center justify-center">
                  <button
                    onClick={handleAddEvent}
                    className="bg-white text-black px-7 py-2 rounded cursor-pointer hover:bg-white/70 mt-4"
                    disabled={loading}
                  >
                    {loading ? "Adding event..." : "Add Event"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
