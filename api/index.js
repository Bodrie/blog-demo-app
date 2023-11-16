require("dotenv").config();
const express = require("express");
const blogRoutes = require("../routes/blogRoutes");
const mongoose = require("mongoose");
const app = express();
const { DB_TOKEN } = process.env;

mongoose
  .connect(DB_TOKEN)
  .then((result) => {
    console.log("[Server Log]\nSuccessfully connected to the DB");
    app.listen(3000);
  })
  .catch((err) => console.log(`[Server Log]\n${err}`));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use("/", (req, res) => {
  res.status(404).render("404", { title: "Not found" });
});
