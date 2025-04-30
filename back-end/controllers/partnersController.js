const Partners = require("../models/Partners");

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partners.find();

    const mappedPartners = partners.map((partner) => ({
      ...partner.toObject(),
      id: partner._id.toString(),
      _id: undefined,
    }));

    res.status(200).json(mappedPartners);
  } catch (error) {
    console.error("Error fetching partners:", error);
    res.status(500).json({ message: "Failed to fetch partners" });
  }
};

exports.createPartners = async (req, res) => {
  try {
    if (!req.file || !req.body.description) {
      return res
        .status(400)
        .json({ message: "Image and description required" });
    }

    const publicId = req.file.originalname.split(".")[0] + "-" + Date.now();
    const uploadResult = await streamUpload(req.file.buffer, publicId);

    const newPartner = new Partners({
      imageUrl: uploadResult.secure_url,
      description: req.body.description,
    });

    await newPartner.save();
    res.status(201).json({ message: "Partner created", partner: newPartner });
  } catch (error) {
    console.error("Error creating partner:", error);
    res.status(500).json({ message: "Failed to create partner" });
  }
};

exports.updatePartners = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partners.findById(id);

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    let newImageUrl = partner.imageUrl;
    if (req.file) {
      const publicId = req.file.originalname.split(".")[0] + "-" + Date.now();
      const uploadResult = await streamUpload(req.file.buffer, publicId);
      newImageUrl = uploadResult.secure_url;
    }

    partner.imageUrl = newImageUrl;
    partner.description = req.body.description || partner.description;

    await partner.save();
    res.status(200).json({ message: "Partner updated", partner });
  } catch (error) {
    console.error("Error updating partner:", error);
    res.status(500).json({ message: "Failed to update partner" });
  }
};
