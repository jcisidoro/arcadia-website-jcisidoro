require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
const Partner = require("../models/Partners");

// Setup MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const partners = [
  {
    fileName: "oases.png",
    description:
      "A sustainability consulting firm that helps clients with total transformation -- driving complex change, enabling sustainable growth, and driving bottomline impact.",
  },
  {
    fileName: "ecoAI.png",
    description:
      "The all-in-one platform for carbon management and climate action-powered by AI. eco.AI simplifies sustainability for organizations by automating carbon tracking, generating ESG reports, and enabling nature-based offsetting-all in one localized, intelligent platform.",
  },
  {
    fileName: "ecobloom.png",
    description:
      "Ecobloom is an eco-friendly packaging solution. This sustainable alternative to plastic and paper packaging aims to reduce environmental waste while providing durable and biodegradable packaging for various industries (e-commerce, logistics, and retail).",
  },
];

const uploadStream = (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "partners",
        public_id: publicId,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const seed = async () => {
  try {
    await Partner.deleteMany(); // optional: clear existing

    for (const item of partners) {
      const imagePath = path.join(__dirname, "seed/partners", item.fileName);
      const buffer = fs.readFileSync(imagePath);

      const publicId = item.fileName.split(".")[0] + "-" + Date.now();
      const uploadResult = await uploadStream(buffer, publicId);

      const newPartner = new Partner({
        imageUrl: uploadResult.secure_url,
        description: item.description,
      });

      await newPartner.save();
      console.log(`Seeded: ${item.fileName}`);
    }

    console.log("✅ Partner seed complete!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    mongoose.disconnect();
  }
};

seed();
