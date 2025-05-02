const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerAdmin = async (req, res) => {
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
};

exports.loginAdmin = async (req, res) => {
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
      return res.status(403).json({
        message: "You do not have permission to access this system.",
      });
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
};

exports.logoutAdmin = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

exports.checkAuth = (req, res) => {
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
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, "-password");
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Error fetching admins", error });
  }
};

exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, role } = req.body;
  const currentUser = req.user;

  if (id === currentUser.id && role !== currentUser.role) {
    return res.status(403).json({ message: "You cannot change your own role" });
  }

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { firstName, lastName, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Admin updated successfully", updatedAdmin });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "superAdmin") {
      return res.status(403).json({
        message: "Only superAdmin role can delete admin accounts",
      });
    }

    const targetAdmin = await Admin.findById(id);

    if (!targetAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (decoded.id === id) {
      const superAdmins = await Admin.find({ role: "superAdmin" });
      if (superAdmins.length === 1) {
        return res.status(400).json({
          message:
            "You are the only superAdmin. Please assign another superAdmin before deleting your account.",
        });
      }
    }

    if (targetAdmin.role === "superAdmin") {
      const superAdmins = await Admin.find({ role: "superAdmin" });
      if (superAdmins.length === 1) {
        return res.status(400).json({
          message:
            "This is the only superAdmin account. At least one must remain.",
        });
      }
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
