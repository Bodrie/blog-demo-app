require("dotenv").config();
const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const mongoose = require("mongoose");
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

app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use('/blogs', blogRoutes);

app.use("/", (req, res) => {
  res.status(404).render("404", { title: "Not found" });
});
