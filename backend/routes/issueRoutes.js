const express = require("express");
const router = express.Router();

const {
    issueBook,
    getIssuedBooks,
    returnBook
} = require("../controllers/issueController");

// Issue a Book
router.post("/", issueBook);

// View Issued Books
router.get("/", getIssuedBooks);

// Return a Book
router.put("/:id", returnBook);

module.exports = router;