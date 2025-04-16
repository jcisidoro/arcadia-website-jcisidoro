const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Partner", PartnerSchema);
