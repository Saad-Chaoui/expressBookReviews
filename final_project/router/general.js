const express = require('express');
const axios = require("axios");
const isValid = require("./auth_users.js").isValid;
const users = require("./auth_users.js").users;
const public_users = express.Router();

const BOOKS_SERVICE_URL = process.env.BOOKS_SERVICE_URL || "http://localhost:5000";

const fetchBooks = async (path = "") => {
  const response = await axios.get(`${BOOKS_SERVICE_URL}/_books${path}`);
  return response.data;
};

const handleError = (res, error, fallbackMessage) => {
  const status = error.response?.status || 500;
  const payload = error.response?.data || { message: fallbackMessage };
  return res.status(status).json(payload);
};

const registerUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered" });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const authenticated = users.some(user => user.username === username && user.password === password);

  if (!authenticated) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }

  const token = require("jsonwebtoken").sign({ username }, "access", { expiresIn: "1h" });
  return res.status(200).json({ message: "User successfully logged in", token });
};

const getAllBooks = async (req, res) => {
  try {
    const books = await fetchBooks();
    return res.status(200).json(books);
  } catch (error) {
    return handleError(res, error, "Unable to retrieve books");
  }
};

const getBookByISBN = async (req, res) => {
  try {
    const book = await fetchBooks(`/isbn/${encodeURIComponent(req.params.isbn)}`);
    return res.status(200).json(book);
  } catch (error) {
    return handleError(res, error, "Unable to retrieve the requested book");
  }
};

const getBooksByAuthor = async (req, res) => {
  try {
    const books = await fetchBooks(`/author/${encodeURIComponent(req.params.author)}`);
    return res.status(200).json(books);
  } catch (error) {
    return handleError(res, error, "Unable to retrieve books for the requested author");
  }
};

const getBooksByTitle = async (req, res) => {
  try {
    const books = await fetchBooks(`/title/${encodeURIComponent(req.params.title)}`);
    return res.status(200).json(books);
  } catch (error) {
    return handleError(res, error, "Unable to retrieve books for the requested title");
  }
};

const getBookReview = async (req, res) => {
  try {
    const reviews = await fetchBooks(`/review/${encodeURIComponent(req.params.isbn)}`);
    return res.status(200).json(reviews);
  } catch (error) {
    return handleError(res, error, "Unable to retrieve reviews");
  }
};


public_users.post("/register", registerUser);
public_users.post("/customer/register", registerUser);
public_users.post("/login", loginUser);

// Get the book list available in the shop
public_users.get('/', getAllBooks);
public_users.get('/books', getAllBooks);

// Get book details based on ISBN
public_users.get('/isbn/:isbn', getBookByISBN);
public_users.get('/books/isbn/:isbn', getBookByISBN);
  
// Get book details based on author
public_users.get('/author/:author', getBooksByAuthor);
public_users.get('/books/author/:author', getBooksByAuthor);

// Get all books based on title
public_users.get('/title/:title', getBooksByTitle);
public_users.get('/books/title/:title', getBooksByTitle);

//  Get book review
public_users.get('/review/:isbn', getBookReview);
public_users.get('/books/review/:isbn', getBookReview);

module.exports.general = public_users;
