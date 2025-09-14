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
    message: [
      `<h1> Hello </h1>`,
      `<h2> Welcome to </h2>`,
      `<h1> Macbook Air </h1>`,
    ],
  });
});

module.exports = app;
