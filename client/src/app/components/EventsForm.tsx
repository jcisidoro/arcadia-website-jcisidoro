import React, { useEffect, useState } from "react";
import { FileUploadDemo } from "./FileUpload";
import { useToast } from "./provider/ToastContext";

export default function EventsForm() {
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [speakers, setSpeakers] = useState("");
  const [attendees, setAttendees] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [events, setEvents] = useState<Event[]>([]);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [resetKey, setResetKey] = useState(0);

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/upcoming-events`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      showToast("Error fetching events:", "error");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEditEvent = async (eventId: string) => {
    const eventData = {
      title,
      speakers,
      attendees,
      description,
      description1,
      eventLink,
      fromDate,
      toDate,
      imageUrl: existingImageUrl || undefined,
    };

    // If a new image is selected, upload it
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      const uploadData = await uploadRes.json();
      if (uploadData.imageUrl) {
        eventData.imageUrl = uploadData.imageUrl;
      }
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        showToast("Event updated successfully", "success");
        // Reset form after updating
        fetchEvents();

        setTitle("");
        setSpeakers("");
        setAttendees("");
        setDescription("");
        setDescription1("");
        setEventLink("");
        setFromDate("");
        setToDate("");
        setImageFile(null);
        setExistingImageUrl(null);
        setSelectedEventId(null);
        setResetKey((prev) => prev + 1);
      } else {
        showToast(data.message || "Failed to update event", "error");
      }
    } catch (error) {
      showToast("Error updating event", "error");
      console.error("Error updating event:", error);
    }
  };
  return (
    <div className="flex flex-col w-full h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
      <div className="flex flex-col w-full">
        {[
          {
            placeholder: "Title",
            value: title,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value),
          },
          {
            placeholder: "Speakers",
            value: speakers,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setSpeakers(e.target.value),
          },
          {
            placeholder: "Attendees",
            value: attendees,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setAttendees(e.target.value),
          },
        ].map((item, index) => (
          <input
            key={index}
            type="text"
            placeholder={item.placeholder}
            value={item.value}
            onChange={item.onChange}
            className="bg-white p-4 outline-none w-full rounded-xl mb-2 text-black"
          />
        ))}
        <FileUploadDemo
          onChange={(file: File) => setImageFile(file)}
          resetKey={resetKey}
          key={resetKey}
          existingImageUrl={existingImageUrl}
        />
        <div className="w-full h-full flex flex-col mt-2">
          {[
            {
              labelText: "From Date",
              value: fromDate,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setFromDate(e.target.value),
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
                e.preventDefault(),
            },
            {
              labelText: "To Date",
              value: toDate,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setToDate(e.target.value),
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
                e.preventDefault(),
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col relative">
              <label className="text-black text-xs absolute left-2 top-0.5">
                {item.labelText}
              </label>
              <input
                type="date"
                value={item.value}
                onChange={item.onChange}
                className="bg-white p-4 outline-none w-full rounded-xl mb-2 text-black"
                onKeyDown={item.onKeyDown}
              />
            </div>
          ))}
          {[
            {
              placeholder: "Description",
              value: description,
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value),
            },
            {
              placeholder: "Another Description",
              value: description1,
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription1(e.target.value),
            },
          ].map((item, index) => (
            <textarea
              key={index}
              placeholder={item.placeholder}
              value={item.value}
              onChange={item.onChange}
              className="bg-white p-4 outline-none w-full rounded-xl mb-2 h-56 resize-none text-black"
            />
          ))}
          <input
            type="text"
            value={eventLink}
            onChange={(e) => setEventLink(e.target.value)}
            placeholder="Add event link"
            className="bg-white p-4 outline-none w-full rounded-xl mb-2 text-black"
          />
        </div>
        <div className="flex flex-col w-full items-center justify-center mt-4 gap-2">
          {/* SUBMIT BTN */}
          <button
            onClick={() => {
              console.log("Editing event with ID:", selectedEventId);
              if (selectedEventId) {
                handleEditEvent(selectedEventId);
              } else {
                showToast("No event selected", "error");
              }
            }}
            className="px-4 py-2 bg-[#326333] hover:bg-[#326333]/80 rounded text-neutral-100 cursor-pointer hover:scale-105 transition-all duration-300 w-full"
          >
            {selectedEventId ? "Update Event" : "Select Event"}
          </button>
          {/* DELETE BTN */}
          <button
            className="px-4 py-2 bg-red-500/90 hover:bg-red-500/70 rounded text-neutral-100 cursor-pointer hover:scale-105 transition-all duration-300 w-full"
            disabled
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
