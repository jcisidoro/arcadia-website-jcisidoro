import { FileUploadDemo } from "../FileUpload";

type EventFormProps = {
  title: string;
  setTitle: (val: string) => void;
  speakers: string;
  setSpeakers: (val: string) => void;
  attendees: string;
  setAttendees: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  description1: string;
  setDescription1: (val: string) => void;
  eventLink: string;
  setEventLink: (val: string) => void;
  fromDate: string;
  setFromDate: (val: string) => void;
  toDate: string;
  setToDate: (val: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  existingImageUrl: string | null;
  resetKey: number;
  selectedEventId: string | null;
  handleEditEvent: (id: string) => void;
  showToast: (
    msg: string,
    type: "success" | "error" | "info" | undefined
  ) => void;
};

export const EventForm = ({
  title,
  setTitle,
  speakers,
  setSpeakers,
  attendees,
  setAttendees,
  description,
  setDescription,
  description1,
  setDescription1,
  eventLink,
  setEventLink,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  setImageFile,
  existingImageUrl,
  resetKey,
  selectedEventId,
  handleEditEvent,
  showToast,
}: EventFormProps) => {
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
};
