require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const serverless = require("serverless-http");

const Admin = require("./models/Admin");
const Event = require("./models/Event");

const multer = require("multer");
const streamifier = require("streamifier");
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

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer config for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload helper
const streamUpload = (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "events",
        public_id: publicId,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Admin Registration Route
app.post("/api/admin/register", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password,
      role: "accCreator",
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Admin Login Route
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add event
app.post("/api/events", upload.single("image"), async (req, res) => {
  const {
    fromDate,
    toDate,
    title,
    speakers,
    attendees,
    description,
    description1,
    eventLink,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const parsedFromDate = new Date(fromDate);
  const parsedToDate = new Date(toDate);

  if (isNaN(parsedFromDate) || isNaN(parsedToDate)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  if (parsedFromDate >= parsedToDate) {
    return res
      .status(400)
      .json({ message: "Start date must be before end date" });
  }

  try {
    // Upload image to Cloudinary
    const publicId = req.file.originalname.split(".")[0] + "-" + Date.now();
    const uploadResult = await streamUpload(req.file.buffer, publicId);

    const newEvent = new Event({
      imageUrl: uploadResult.secure_url,
      fromDate: parsedFromDate,
      toDate: parsedToDate,
      title,
      speakers,
      attendees,
      description,
      description1,
      eventLink,
    });

    await newEvent.save();

    res
      .status(201)
      .json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding event", error });
  }
});

// Fetch upcoming events
app.get("/api/events", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today (midnight)

    const events = await Event.find({
      fromDate: { $gte: today }, // Only fetch events where fromDate is today or in the future
    }).sort({ fromDate: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching upcoming events", error });
  }
});

// Fetch past events
app.get("/api/past-events", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today (midnight)

    const events = await Event.find({
      fromDate: { $lt: today }, // Only fetch events where fromDate is strictly before today
    }).sort({ fromDate: 1 });

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
