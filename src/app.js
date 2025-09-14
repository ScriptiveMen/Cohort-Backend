const express = require("express");
const app = express();
const morgan = require("morgan");

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.post("/api/auth/register", (req, res) => {
  res.status(200).json({ message: "User registered!" });
});

app.get("/", (req, res) => {
  res.render("index", {
    message: ["Hello", "How are you?", "Good afternoon!"],
  });
});

module.exports = app;
