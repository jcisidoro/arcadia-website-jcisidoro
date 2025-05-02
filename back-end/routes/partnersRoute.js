const express = require("express");
const upload = require("../middleware/upload");
const {
  getAllPartners,
  createPartners,
  updatePartners,
  softDeletePartner,
  hardDeletePartner,
} = require("../controllers/partnersController");

const router = express.Router();

router.get("/", getAllPartners);
router.post("/createPartner", upload.single("image"), createPartners);
router.patch("/:id", upload.single("image"), updatePartners);
router.patch("/:id/softDelete", softDeletePartner);
router.delete("/:id", hardDeletePartner);

module.exports = router;
