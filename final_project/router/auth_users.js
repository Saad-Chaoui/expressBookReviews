const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
  return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }

  const accessToken = jwt.sign({ username }, "access", { expiresIn: "1h" });
  return res.status(200).json({ message: "User successfully logged in", token: accessToken });
});

// Add a book review
const upsertReview = (req, res) => {
  const { isbn } = req.params;
  const username = req.user?.username;
  const review = req.body.review || req.body.reviews || req.query.review;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!review || typeof review !== "string" || !review.trim()) {
    return res.status(400).json({ message: "Review text is required" });
  }

  books[isbn].reviews[username] = review.trim();

  return res.status(200).json({
    message: "Review added or updated successfully",
    reviews: books[isbn].reviews,
  });
};

const deleteReview = (req, res) => {
  const { isbn } = req.params;
  const username = req.user?.username;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Review not found for this user" });
  }

  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: "Review deleted successfully",
    reviews: books[isbn].reviews,
  });
};

regd_users.put("/review/:isbn", upsertReview);
regd_users.put("/auth/review/:isbn", upsertReview);
regd_users.delete("/review/:isbn", deleteReview);
regd_users.delete("/auth/review/:isbn", deleteReview);

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
