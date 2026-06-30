const express = require("express");
const router = express.Router();

const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

// ✅ Add Book
router.post("/", addBook);

// ✅ Get All Books
router.get("/", getBooks);

// ✅ Get Single Book (ONLY valid MongoDB ID)
router.get("/:id", getBookById);

// ✅ Update Book
router.put("/:id", updateBook);

// ✅ Delete Book
router.delete("/:id", deleteBook);

module.exports = router;