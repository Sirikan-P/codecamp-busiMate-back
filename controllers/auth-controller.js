const bcrypt = require("bcryptjs");
const prisma = require("../models");
const jwt = require("jsonwebtoken");
const cloudinary = require("../configs/cloudinary");

module.exports.registerUser = async (req, res) => {
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

    res.json({ success: true, message: "Register successful", result, token });
  } catch (error) {
    console.log("Error in register user controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.registerDriver = async (req, res) => {
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
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
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

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    const { password: pw, ...userData } = user;
    res.json({ success: true, message: "Login Successful", token, userData });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.loginDriver = async (req, res) => {
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

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    const { password: pw, ...userData } = user;
    res.json({ success: true, message: "Login Successful", token, userData });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const payload = { email };
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Password required" });
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Error in admin login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user.id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePic: uploadResponse.secure_url },
    });
    res
      .status(200)
      .json({ success: true, message: "Profile updated", data: updatedUser });
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
