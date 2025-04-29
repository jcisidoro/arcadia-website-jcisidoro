// models/Solutions.js
const mongoose = require("mongoose");

const SolutionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speakers: { type: String, required: true },
  description: { type: String, required: true },
  description1: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Solutions", SolutionsSchema);
