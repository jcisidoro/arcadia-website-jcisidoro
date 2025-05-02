//server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const https = require("https");

const {
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

// const Partners = require("./models/Partners");

const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");
const partnersRoutes = require("./routes/partnersRoute");
const opinionRoutes = require("./routes/opinionRoutes");
const wasteReportsRoutes = require("./routes/wasteReportsRoutes");
const solutionsRoutes = require("./routes/solutionsRoutes");

// Middleware
app.use(cookieParser()); // cookie parsing
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // secure HTTP headers
app.use(limiter); // rate limiting
app.use(cors(corsOptions)); // Enable CORS with specified options
// app.use(csrfProtection);

//Admin Route
app.use("/api/admin", adminRoutes);
//Event Route
app.use("/api/events", eventRoutes);
//Partners Route
app.use("/api/partners", partnersRoutes);
//Opinions Route
app.use("/api/opinions", opinionRoutes);
//Waste Reports Route
app.use("/api/waste-reports", wasteReportsRoutes);
//Solutions Route
app.use("/api/solutions", solutionsRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Route to GET CSRF token
// app.get("/api/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

// Ping back end to prevent sleeping
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

// cron.schedule("0 0 * * *", async () => {
//   const twoYearsAgo = new Date();
//   twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

//   await Partners.deleteMany({
//     isDeleted: true,
//     deletedAt: { $lte: twoYearsAgo },
//   });

//   console.log("Auto-cleaned archived partners older than 2 years");
// });

// Back end handler
app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
