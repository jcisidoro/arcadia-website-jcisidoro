const express = require("express");
const { checkRole } = require("../middleware/middleware");
const upload = require("../middleware/upload");
const {
  createEvent,
  getAllUpcomingEvents,
  getAllPastEvents,
  getAllSoftDeletedEvents,
  updateEventById,
  softDeleteEventById,
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
router.patch(
  "/:id/soft-delete",
  checkRole(["eventHandler", "superAdmin"]),
  softDeleteEventById
);

router.get("/upcoming-events", getAllUpcomingEvents);
router.get("/past-events", getAllPastEvents);
router.get("/softDeleted-events", getAllSoftDeletedEvents);

module.exports = router;
