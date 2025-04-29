// seedOpinions.js

require("dotenv").config();
const mongoose = require("mongoose");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const path = require("path");

// Setup Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const OpinionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speakers: { type: String, required: true },
  description: { type: String, required: true },
  description1: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Opinion = mongoose.model("Opinion", OpinionSchema);

// Your cards data
const cards = [
  {
    title: "The Future of Renewable Energy",
    speakers: "By Jane Doe",
    src: "/solarPanel.avif",
    description:
      "As the world shifts away from fossil fuels, renewable energy sources like solar and wind power are becoming more viable. But are we moving fast enough?",
    description1:
      "Climate change is accelerating, and the need for clean energy is more urgent than ever. While investments in solar, wind, and hydropower are increasing, challenges such as infrastructure limitations and energy storage must be addressed. Governments and corporations must collaborate to ensure a sustainable future.",
  },
  {
    title: "Is AI a Threat to Journalism?",
    speakers: "By John Smith",
    src: "/robot.avif",
    description:
      "Artificial Intelligence is transforming the media landscape, but is it helping or harming journalism?",
    description1:
      "AI-generated content is flooding the internet, raising concerns about misinformation and the future of human journalists. While AI can assist in fact-checking and automation, it lacks the investigative depth and ethical judgment of professional reporters. The key question remains: How do we balance AI's efficiency with journalistic integrity?",
  },
  {
    title: "Plastic Waste: Are We Doing Enough?",
    speakers: "By Emily Carter",
    src: "/plastic-waste.avif",
    description:
      "Despite global awareness, plastic waste continues to be a major problem. Are bans on single-use plastics enough",
    description1:
      "Every year, millions of tons of plastic end up in landfills and oceans. While some countries have taken action by banning plastic bags and straws, others lag behind. The real challenge lies in creating a circular economy where plastic is reused rather than discarded.",
  },
  {
    title: "Can We Build Climate-Resilient Cities?",
    speakers: "By Michael Green",
    src: "/flooded-city.avif",
    description:
      "As extreme weather events become more common, urban planning must adapt. But are cities doing enough to become climate-resilient?",
    description1:
      "Rising sea levels, heatwaves, and storms threaten urban areas. Smart city planning that integrates green infrastructure, renewable energy, and disaster preparedness is essential. The question is, will governments prioritize resilience over short-term economic gains?",
  },
  {
    title: "The Ethics of Space Exploration",
    speakers: "By Sarah Johnson",
    src: "/astronaut.avif",
    description:
      "Space exploration is expanding rapidly, but do we need ethical guidelines before colonizing other planets?",
    description1:
      "With private companies racing to explore Mars, ethical concerns arise. Who owns space? What happens if we exploit extraterrestrial resources irresponsibly? As we push forward, it's crucial to establish policies that ensure responsible and equitable space exploration.",
  },
];

// Upload a local image to Cloudinary
async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "opinions",
    });
    return result.secure_url;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    for (const card of cards) {
      const localImagePath = path.join(__dirname, "/seed/partners", card.src);

      if (!fs.existsSync(localImagePath)) {
        console.error(`Image not found: ${localImagePath}`);
        continue;
      }

      const imageUrl = await uploadImage(localImagePath);

      const opinion = new Opinion({
        title: card.title,
        speakers: card.speakers,
        description: card.description,
        description1: card.description1 || "",
        imageUrl,
      });

      await opinion.save();
      console.log(`Saved: ${card.title}`);
    }

    console.log("All cards have been seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
