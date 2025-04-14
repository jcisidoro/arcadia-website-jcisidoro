//server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const https = require("https");
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

const Admin = require("./models/Admin");
const Event = require("./models/Event");

const {
  checkRole,
  limiter,
  corsOptions,
  helmet,
  cookieParser,
  cors,
  // csrfProtection,
} = require("./middleware/middleware");

const app = express();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cookieParser()); // cookie parsing
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // secure HTTP headers
app.use(limiter); // rate limiting
app.use(cors(corsOptions)); // Enable CORS with specified options
// app.use(csrfProtection);

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
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // limits to 10 MB
});

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

// Route to GET CSRF token
// app.get("/api/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

// Check Authentication Route
app.get("/api/admin/check-auth", (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Authenticated", user: decodedToken });
  } catch (err) {
    console.error("Token verification failed:", err);
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired", expired: true });
    }
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Logout Route
app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// Admin Registration Route
app.post("/api/admin/register", checkRole(), limiter, async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, role } =
    req.body;

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

    const validRoles = ["accCreator", "eventHandler", "adminManager"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Admin Login Route
app.post("/api/admin/login", limiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res
        .status(400)
        .json({ message: "No admin access found with that email address." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({
        message: "The password you entered is incorrect. Please try again..",
      });

    const validRoles = [
      "superAdmin",
      "accCreator",
      "eventHandler",
      "adminManager",
    ];
    if (!validRoles.includes(admin.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this system." });
    }

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

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000, // Token expires in 1 hour
    });

    res.json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add event
app.post(
  "/api/events",
  checkRole(),
  upload.single("image"),
  async (req, res) => {
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
      res.status(500).json({
        message:
          "An error occurred while adding the event. Please try again later.",
        error,
      });
    }
  }
);

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

// Update event route - PATCH request to update an event
app.patch("/api/events/:id", checkRole(), async (req, res) => {
  const { id } = req.params;
  const {
    title,
    speakers,
    attendees,
    description,
    description1,
    eventLink,
    fromDate,
    toDate,
    imageUrl,
  } = req.body;

  console.log("Received event data:", req.body);

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete old image from Cloudinary if a new image is provided
    if (imageUrl && event.imageUrl && imageUrl !== event.imageUrl) {
      const publicId = event.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Update the event with new data
    event.title = title || event.title;
    event.speakers = speakers || event.speakers;
    event.attendees = attendees || event.attendees;
    event.description = description || event.description;
    event.description1 = description1 || event.description1;
    event.eventLink = eventLink || event.eventLink;
    event.fromDate = new Date(fromDate) || event.fromDate;
    event.toDate = new Date(toDate) || event.toDate;
    event.imageUrl = imageUrl || event.imageUrl;

    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the event",
      error,
    });
  }
});

const PING_URL = "https://arcadia-website-jcisidoro.onrender.com/api/events";

cron.schedule("*/5 * * * *", () => {
  console.log("Pinging self to prevent sleep...");

  https
    .get(PING_URL, (res) => {
      console.log(`Pinged successfully. Status Code: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.error("Error pinging self:", err);
    });
});

// Root path handler
app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
