const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speakers: { type: String, required: true },
  attendees: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  description: { type: String, required: true },
  description1: { type: String, required: false },
  imageUrl: { type: String, required: true },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
