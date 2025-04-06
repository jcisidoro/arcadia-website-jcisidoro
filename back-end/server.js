require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const serverless = require("serverless-http");

const User = require("./models/User");
const Event = require("./models/Event");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const app = express();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON request bodies

// CORS Configuration
const corsOptions = {
  origin: [
    "https://arcadia-website-jcisidoro.onrender.com",
    "https://arcadia-website-sustainability-hub.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Enable CORS with specified options
app.options("*", cors(corsOptions));

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

// Image upload
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  if (!req.file.path || !req.file.filename) {
    return res
      .status(500)
      .json({ error: "Failed to upload image to Cloudinary" });
  }
  res.json({ imageUrl: req.file.path });
});

// Add event
app.post("/api/events", async (req, res) => {
  try {
    const {
      imageUrl,
      fromDate,
      toDate,
      title,
      speakers,
      description,
      description1,
    } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const parsedFromDate = new Date(fromDate);
    const parsedToDate = new Date(toDate);

    // Check if parsed dates are valid
    if (isNaN(parsedFromDate) || isNaN(parsedToDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (parsedFromDate >= parsedToDate) {
      return res
        .status(400)
        .json({ message: "Start date must be before end date" });
    }

    const newEvent = new Event({
      imageUrl,
      fromDate: parsedFromDate,
      toDate: parsedToDate,
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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today (midnight)

    const events = await Event.find({
      fromDate: { $gte: today }, // Only fetch events where fromDate is today or in the future
    });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// Fetch past events
app.get("/api/past-events", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today (midnight)

    const events = await Event.find({
      fromDate: { $lt: today }, // Only fetch events where fromDate is strictly before today
    });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching past events", error });
  }
});

module.exports = app;
module.exports.handler = serverless(app);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
