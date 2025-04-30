const express = require("express");
const { getAllWasteReports } = require("../controllers/wasteReportsController");
const router = express.Router();

router.get("/", getAllWasteReports);

module.exports = router;
