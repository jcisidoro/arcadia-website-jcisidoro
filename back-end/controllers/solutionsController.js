const Solutions = require("../models/Solutions");

exports.getAllSolutions = async (req, res) => {
  try {
    const solutions = await Solutions.find().sort({ createdAt: 1 });
    res.json(solutions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load solutions" });
  }
};
