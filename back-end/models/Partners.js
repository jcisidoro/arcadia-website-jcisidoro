const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },

  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Partner", PartnerSchema);
