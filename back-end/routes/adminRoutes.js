const express = require("express");
const { checkRole, limiter } = require("../middleware/middleware");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  checkAuth,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const router = express.Router();

router.post(
  "/register",
  checkRole(["superAdmin", "accCreator"]),
  limiter,
  registerAdmin
);
router.post("/login", limiter, loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/check-auth", checkAuth);
router.get("/", getAllAdmins);
router.patch("/:id", checkRole(["superAdmin", "adminManager"]), updateAdmin);
router.delete("/deleteAdmin/:id", checkRole(["superAdmin"]), deleteAdmin);

module.exports = router;
