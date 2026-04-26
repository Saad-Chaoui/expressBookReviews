const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const books = require('./router/booksdb.js');

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/review", function auth(req, res, next) {
	const authorization = req.headers.authorization;

	if (!authorization) {
		return res.status(401).json({ message: "Authorization header missing" });
	}

	const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : authorization;

	try {
		req.user = jwt.verify(token, "access");
		return next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
});

app.use("/customer/auth/review", function auth(req, res, next) {
	const authorization = req.headers.authorization;

	if (!authorization) {
		return res.status(401).json({ message: "Authorization header missing" });
	}

	const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : authorization;

	try {
		req.user = jwt.verify(token, "access");
		return next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
});

app.get("/_books", (req, res) => {
	return res.status(200).json(books);
});

app.get("/_books/isbn/:isbn", (req, res) => {
	const { isbn } = req.params;
	const book = books[isbn];

	if (!book) {
		return res.status(404).json({ message: "Book not found" });
	}

	return res.status(200).json(book);
});

app.get("/_books/author/:author", (req, res) => {
	const author = req.params.author.toLowerCase();
	const matchedBooks = Object.fromEntries(
		Object.entries(books).filter(([, book]) => book.author.toLowerCase() === author)
	);

	return res.status(200).json(matchedBooks);
});

app.get("/_books/title/:title", (req, res) => {
	const title = req.params.title.toLowerCase();
	const matchedBooks = Object.fromEntries(
		Object.entries(books).filter(([, book]) => book.title.toLowerCase().includes(title))
	);

	return res.status(200).json(matchedBooks);
});

app.get("/_books/review/:isbn", (req, res) => {
	const { isbn } = req.params;
	const book = books[isbn];

	if (!book) {
		return res.status(404).json({ message: "Book not found" });
	}

	return res.status(200).json(book.reviews);
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
