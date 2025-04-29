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

const SolutionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speakers: { type: String, required: true },
  description: { type: String, required: true },
  description1: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Solutions = mongoose.model("Solutions", SolutionsSchema);

// Your cards data
const cards = [
  {
    title: "Plastic Waste Reduction",
    speakers: "",
    src: "/recycle.avif",
    description:
      "Plastic waste is a major environmental issue, as it pollutes oceans, harms wildlife, and contributes to climate change. Plastic waste reduction focuses on minimizing plastic use, improving recycling systems, and promoting alternatives like biodegradable materials. Key strategies include:",
    description1:
      "Reduce: Using less plastic by opting for reusable bags, bottles, and packaging. Reuse: Finding second-life uses for plastic products. Recycle: Properly sorting and recycling plastic waste.Innovate: Developing alternatives like bioplastics or packaging-free products. Policy Support: Implementing bans on single-use plastics and promoting producer responsibility programs.",
  },
  {
    title: "Food Waste Recovery",
    speakers: "",
    src: "/fertilizer.avif",
    description:
      "Food waste is a global problem, leading to wasted resources (water, land, and energy) and increased greenhouse gas emissions. Food waste recovery aims to reduce food waste and redirect surplus food to those in need. Key approaches include:",
    description1:
      "Source Reduction: Preventing food waste by improving inventory management, portion control, and food storage. Food Redistribution: Donating surplus food to food banks and charities instead of discarding it. Composting & Animal Feed: Converting food waste into compost or using it as livestock feed. Anaerobic Digestion: Breaking down food waste to produce biogas and biofertilizers. Consumer Education: Raising awareness about food  expiration dates, meal planning, and storage techniques.",
  },
  {
    title: "Waste-to-Energy",
    speakers: "",
    src: "/landfill.avif",
    description:
      "Waste-to-Energy refers to converting non-recyclable waste materials into usable forms of energy, such as electricity, heat, or biofuels. This helps reduce landfill waste while producing renewable energy. Key methods include:",
    description1:
      "Incineration: Burning waste to generate steam for electricity. Gasification: Heating waste in low-oxygen conditions to produce syngas for energy. Anaerobic Digestion: Breaking down organic waste to create biogas. Pyrolysis: Decomposing waste using heat to produce bio-oil or syngas. Landfill Gas Recovery: Capturing methane from decomposing waste in landfills for energy use.",
  },
  {
    title: "Disaster Risk Resilience",
    speakers: "",
    src: "/housing.avif",
    description:
      "Disaster risk resilience refers to the ability of communities, infrastructure, and systems to withstand, adapt to, and recover from disasters such as floods, earthquakes, wildfires, and storms. Key elements include:",
    description1:
      "Risk Assessment: Identifying hazards and vulnerabilities in a community. Early Warning Systems: Using technology to detect and warn about disasters before they occur. Infrastructure Adaptation: Building earthquake-resistant buildings, flood defenses, and resilient power grids.Community Preparedness: Educating people on evacuation plans and emergency response. Ecosystem-Based Solutions: Using nature, such as mangroves and wetlands, to buffer against climate-related disasters.",
  },
  {
    title: "Renewable Energy",
    speakers: "",
    src: "/dam.avif",
    description:
      "Renewable energy comes from naturally replenished sources that have a lower environmental impact compared to fossil fuels. Major types include:",
    description1:
      "Solar Energy: Using sunlight to generate electricity via solar panels. Wind Energy: Harnessing wind power through turbines to generate electricity. Hydropower: Using flowing water to produce energy, typically from dams. Geothermal Energy: Extracting heat from the Earth's interior for power and heating. Biomass Energy: Converting organic materials into energy sources like biofuels.",
  },
];

// Upload a local image to Cloudinary
async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "solutions",
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

      const solutions = new Solutions({
        title: card.title,
        speakers: card.speakers | "",
        description: card.description,
        description1: card.description1 || "",
        imageUrl,
      });

      await solutions.save();
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
