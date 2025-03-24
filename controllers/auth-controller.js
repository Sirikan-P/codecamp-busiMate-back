const bcrypt = require("bcryptjs");
const prisma = require("../models");
const jwt = require("jsonwebtoken");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs").promises;

module.exports = {
  registerUser: async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    try {
      if (
        !(
          firstName.trim() &&
          lastName.trim() &&
          email.trim() &&
          password.trim() &&
          phoneNumber.trim()
        )
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }

      const exists = await prisma.user.findUnique({
        where: { email },
      });
      if (exists) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
      };

      const result = await prisma.user.create({ data: newUser });
      const userId = result.id;
      const role = result.role;

      const payload = { email, id: userId, role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });

      res.json({
        success: true,
        message: "Register successful",
        result,
        token,
      });
    } catch (error) {
      console.log("Error in register user controller:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  registerDriver: async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, age, gender } =
      req.body;
    try {
      if (
        !(
          firstName.trim() &&
          lastName.trim() &&
          email.trim() &&
          password.trim() &&
          phoneNumber.trim() &&
          age.trim() &&
          gender.trim()
        )
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }

      const exists = await prisma.driver.findUnique({
        where: { email },
      });
      if (exists) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const parsedAge = parseInt(age, 10);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        firstName,
        lastName,
        email,
        phoneNumber,
        age: parsedAge,
        gender,
        password: hashedPassword,
      };

      const result = await prisma.driver.create({ data: newUser });
      const userId = result.id;
      const role = result.role;

      const payload = { email, id: userId, role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });

      res.json({
        success: true,
        message: "Register successful",
        result,
        token,
      });
    } catch (error) {
      console.log("Error in register driver controller:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    try {
      if (!email.trim() || !password.trim()) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const payload = { id: user.id, email: user.email, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });

      const { password: pw, ...userData } = user;
      res.json({ success: true, message: "Login Successful", token, userData });
    } catch (error) {
      console.log("Error in login controller:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  loginDriver: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email.trim() || !password.trim()) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const user = await prisma.driver.findUnique({ where: { email } });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const payload = { id: user.id, email: user.email, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });

      const { password: pw, ...userData } = user;
      res.json({ success: true, message: "Login Successful", token, userData });
    } catch (error) {
      console.log("Error in login controller:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  adminLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Email and Password required" });
      }
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const payload = { email, role: "admin" };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "15d",
        });
        const adminData = { email, role: "admin" };
        res.json({ success: true, token, adminData });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.log("Error in admin login controller:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateProfile: async (req, res) => {
    try {
      console.log("Request received for updateProfile:", {
        userId: req.user?.id,
        file: req.file,
      });

      const userId = req.user.id;
      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: User ID not found" });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No image file uploaded" });
      }

      const profilePic = req.file.path;
      console.log("File path to upload:", profilePic);

      await fs.access(profilePic).catch((err) => {
        throw new Error(`File not found: ${profilePic} - ${err.message}`);
      });

      console.log("Cloudinary config:", {
        cloud_name: cloudinary.config().cloud_name,
        api_key: cloudinary.config().api_key,
        api_secret: !!cloudinary.config().api_secret,
      });

      let uploadResponse;
      try {
        uploadResponse = await cloudinary.uploader.upload(profilePic, {
          folder: "profile_images",
        });
      } catch (cloudinaryError) {
        throw new Error(`Cloudinary upload failed: ${cloudinaryError.message}`);
      }
      console.log("Cloudinary upload response:", uploadResponse);

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { profileImage: uploadResponse.secure_url },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      });
      console.log("Updated user:", updatedUser);

      await fs
        .unlink(profilePic)
        .catch((err) => console.error("Failed to delete temp file:", err));

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log("Error in update profile:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateDriverProfile: async (req, res) => {
    try {
      const driverId = req.driver.id; // Using req.driver from authDriver
      if (!driverId) {
        return res
          .status(401)
          .json({
            success: false,
            message: "Unauthorized: Driver ID not found",
          });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No image file uploaded" });
      }

      const profilePic = req.file.path;
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "profile_images",
      });

      const updatedDriver = await prisma.driver.update({
        where: { id: driverId },
        data: { profileImage: uploadResponse.secure_url },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      });

      await fs
        .unlink(profilePic)
        .catch((err) => console.error("Failed to delete temp file:", err));

      res.status(200).json({
        success: true,
        message: "Driver profile updated successfully",
        data: updatedDriver,
      });
    } catch (error) {
      console.log("Error in update driver profile:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  checkUserAuth: async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          profileImage: true,
          role: true,
          createdAt: true,
        },
      });
      if (result) return res.status(200).json({ result });
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.log("Error in checkUserAuth controller:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  checkDriverAuth: async (req, res) => {
    try {
      const driverId = req.driver.id;
      const result = await prisma.driver.findUnique({
        where: { id: driverId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          age: true,
          gender: true,
          role: true,
          createdAt: true,
        },
      });
      if (result) return res.status(200).json({ result });
      return res.status(404).json({ message: "Driver not found" });
    } catch (error) {
      console.log("Error in checkDriverAuth controller:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  checkAdminAuth: async (req, res) => {
    try {
      const adminEmail = req.admin.email;
      if (adminEmail !== process.env.ADMIN_EMAIL) {
        return res
          .status(403)
          .json({ success: false, message: "Forbidden: Admin access only" });
      }

      const result = {
        email: adminEmail,
        role: "admin",
      };

      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("Error in checkAdminAuth controller:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};


