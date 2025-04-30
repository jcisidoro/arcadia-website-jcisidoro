const express = require("express");
const { checkRole } = require("../middleware/middleware");
const upload = require("../middleware/upload");
const {
  createOpinionEditorials,
  getAllOpinionEditorials,
} = require("../controllers/opinionController");

const router = express.Router();

router.post(
  "/createOpinionEditorials",
  checkRole(),
  upload.single("image"),
  createOpinionEditorials
);
router.get("/", getAllOpinionEditorials);

module.exports = router;
