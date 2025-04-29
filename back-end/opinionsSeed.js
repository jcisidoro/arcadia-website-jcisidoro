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

const WasteReportsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speakers: { type: String, required: true },
  description: { type: String, required: true },
  description1: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const WasteReports = mongoose.model("WasteReports", WasteReportsSchema);

// Your cards data
const cards = [
  {
    title:
      "The Global Plastic Crisis: Challenges, Innovations, and Policy Solutions",
    speakers: "Environmental Research Institute",
    src: "/recycle.avif",
    description:
      "A comprehensive report on the escalating plastic waste problem, its devastating effects on ecosystems, and the urgent need for sustainable solutions.",
    description1:
      "Plastic pollution has reached alarming levels, with over 300 million tons produced annually, much of it ending up in oceans and landfills. Only 9% of plastic waste is properly recycled, highlighting inefficiencies in global waste management systems. Microplastics are now found in human bloodstreams, raising concerns about long-term health effects. Major policy initiatives, such as the EU&apos;s Single-Use Plastic Ban and global extended producer responsibility (EPR) programs, are gaining traction. Innovations in biodegradable plastics and advanced recycling technologies offer promising solutions but require widespread adoption.",
  },
  {
    title: "Food Waste and Sustainability: Turning Waste Into Opportunity",
    speakers: "Global Sustainability Initiative",
    src: "/fertilizer.avif",
    description:
      "An in-depth study on the impact of food waste on global sustainability and how businesses, governments, and individuals can drive meaningful change.",
    description1:
      "1.3 billion tons of food are wasted each year, accounting for nearly one-third of all food produced globally. Food waste is a leading contributor to climate change, responsible for 8-10% of global greenhouse gas emissions. Developing countries face food distribution challenges, while industrialized nations struggle with overconsumption and waste. Innovative solutions, such as AI-driven inventory management, surplus food redistribution programs, and composting initiatives, are proving effective. Legislation like France&apos;s supermarket food waste ban is setting a global precedent for tackling the issue at the policy level.",
  },
  {
    title: "From Waste to Energy: Transforming Trash Into Renewable Power",
    speakers: "Energy & Environment Report 2024",
    src: "/landfill.avif",
    description:
      "An analysis of how waste-to-energy (WTE) technologies are reshaping global energy markets by converting garbage into usable power.",
    description1:
      "Waste-to-energy plants produce over 500 terawatt-hours of electricity annually, enough to power millions of homes worldwide. Advanced incineration technology reduces landfill waste by up to  90%, significantly cutting methane emissions. Biogas from organic waste is emerging as a key renewable energy source, reducing reliance on fossil fuels. Countries like Sweden have nearly eliminated landfills by adopting waste-to-energy solutions and circular economy principles. Challenges remain in public perception and emissions control, but innovations in carbon capture make WTE a cleaner alternative.",
  },
  {
    title:
      "Building Climate-Resilient Cities: Strategies for a Sustainable Future",
    speakers: "UN Climate Resilience Report",
    src: "/housing.avif",
    description:
      "A detailed look at how urban areas can adapt to climate change by integrating sustainable infrastructure and disaster preparedness strategies.",
    description1:
      " Rising global temperatures and extreme weather events are putting cities at risk, with flooding, heatwaves, and storms becoming more frequent. Flood-resistant infrastructure, such as permeable pavements and elevated buildings, can reduce damage by 30%.Smart city planning integrates renewable energy, green spaces, and resilient transportation systems to future-proof urban areas. Early warning systems improve evacuation times by 40%, significantly reducing disaster-related casualties. Major global cities like Tokyo and Amsterdam are leading the way in implementing climate adaptation strategies.",
  },
];

// Upload a local image to Cloudinary
async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "wasteReports",
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

      const wasteReports = new WasteReports({
        title: card.title,
        speakers: card.speakers,
        description: card.description,
        description1: card.description1 || "",
        imageUrl,
      });

      await wasteReports.save();
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
