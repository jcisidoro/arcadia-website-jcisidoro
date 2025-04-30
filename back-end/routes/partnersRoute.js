const express = require("express");
const upload = require("../middleware/upload");
const {
  getAllPartners,
  createPartners,
  updatePartners,
} = require("../controllers/partnersController");

const router = express.Router();

router.get("/", getAllPartners);
router.post("/createPartner", upload.single("image"), createPartners);
router.patch("/:id", upload.single("image"), updatePartners);

module.exports = router;
