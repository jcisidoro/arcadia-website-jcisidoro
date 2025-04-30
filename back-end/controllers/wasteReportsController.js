const WasteReports = require("../models/WasteReports");

exports.getAllWasteReports = async (req, res) => {
  try {
    const wasteReports = await WasteReports.find().sort({ createdAt: 1 });
    res.json(wasteReports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load wasteReports" });
  }
};
