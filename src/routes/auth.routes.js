const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const userExists = await userModel.findOne({ username });

  if (userExists) {
    return res.status(409).json({
      message: "Username already exists",
    });
  }

  const user = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie("token", token);

  res.status(201).json({
    message: "User is registered sucessfully",
    user,
  });
});

router.get("/user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - Token required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({
      _id: decoded.id,
    });

    res.status(200).json({
      message: "User data found",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: "No account found",
    });
  }

  const isPasswordValid = user.password === password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "incorrect password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in",
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out",
  });
});

module.exports = router;
