const Opinion = require("../models/Opinion");

exports.createOpinionEditorials = async (req, res) => {
  try {
    if (!req.file) throw new Error("Image file is required");
    const publicId = `opinions/${req.file.originalname}-${Date.now()}`;
    const result = await streamUpload(req.file.buffer, publicId);

    const { title, speakers, description, description1 } = req.body;
    const opinion = new Opinion({
      title,
      speakers,
      description,
      description1: description1 || "",
      imageUrl: result.secure_url,
    });
    await opinion.save();

    res.status(201).json(opinion);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

exports.getAllOpinionEditorials = async (req, res) => {
  try {
    const opinions = await Opinion.find().sort({ createdAt: 1 });
    res.json(opinions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load opinions" });
  }
};
