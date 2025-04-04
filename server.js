require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User"); // Import User model
const Event = require("./models/Event"); // Import Event model

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const app = express();
const PORT = process.env.PORT || 3100;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Admin Login Route
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "events",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return file.originalname.split(".")[0] + "-" + uniqueSuffix;
    },
  },
});

const upload = multer({ storage });

// Image Upload Route
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ imageUrl: req.file.path }); // Return uploaded image URL
});

// Add event
app.post("/api/events", async (req, res) => {
  try {
    const { imageUrl, date, title, speakers, description, description1 } =
      req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      imageUrl, // The image URL returned from the Cloudinary upload
      date: new Date(date),
      title,
      speakers,
      description,
      description1,
    });

    await newEvent.save(); // Save the new event to the database

    res
      .status(201)
      .json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding event", error });
  }
});

// Fetch all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
