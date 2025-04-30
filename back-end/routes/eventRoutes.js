const express = require("express");
const { checkRole } = require("../middleware/middleware");
const upload = require("../middleware/upload");
const {
  createEvent,
  getAllUpcomingEvents,
  getAllPastEvents,
  updateEventById,
} = require("../controllers/eventController");

const router = express.Router();

router.post(
  "/",
  checkRole(["eventHandler", "superAdmin"]),
  upload.single("image"),
  createEvent
);
router.patch(
  "/:id",
  checkRole(["eventHandler", "superAdmin"]),
  upload.single("image"),
  updateEventById
);
router.get("/upcoming-events", getAllUpcomingEvents);
router.get("/past-events", getAllPastEvents);

module.exports = router;
