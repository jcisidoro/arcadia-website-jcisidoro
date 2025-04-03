import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true, index: true },
    image: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    description1: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Prevent model re-compilation in Next.js (important)
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
