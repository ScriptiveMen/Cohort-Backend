const express = require("express");
const userModel = require("../models/user.model");
const router = express();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username: username,
    password: password,
  });

  res.status(201).json({
    message: "User registered sucessfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });

  if (!user) {
    return res.status(401).json({
      message: "Invalid username",
    });
  }

  const isValidPassword = password == user.password;

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  res.status(200).json({
    message: "User logged in",
  });
});

module.exports = router;
