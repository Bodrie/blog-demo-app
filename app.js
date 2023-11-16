require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const app = express();

//db
const { TOKEN } = process.env;
const db = TOKEN;

mongoose
  .connect(db)
  .then((result) => {
    console.log("db connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New blog" });
});

app.use("/", (req, res) => {
  res.status(404).render("404", { title: "Not found" });
});
