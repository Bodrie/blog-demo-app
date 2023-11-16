const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("blogs/index", { title: "All blogs", blogs: result });
    })
    .catch((err) => console.log(`[Server Log]\n${err}`));
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "New blog" });
};

const blog_create_post = (req, res) => {
  const newBlog = new Blog(req.body);
  newBlog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(`[Server Log]\n${err}`));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog details" });
    })
    .catch((err) => {
      res.status().render("404", { title: "Blog not found!" });
    });
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(`[Server Log]\n${err}`));
};

module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete,
};
