const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router-Level Middleware");
  next();
});

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to server",
  });
});

module.exports = router;
