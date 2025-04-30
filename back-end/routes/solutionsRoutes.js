const express = require("express");
const { getAllSolutions } = require("../controllers/solutionsController");
const router = express.Router();

router.get("/", getAllSolutions);

module.exports = router;
