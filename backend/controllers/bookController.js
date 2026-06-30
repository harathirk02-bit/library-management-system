const Book = require("../models/Book");
const mongoose = require("mongoose");

// ADD BOOK
const addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();

        res.status(201).json({
            message: "Book added successfully",
            book: newBook
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL BOOKS
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET BOOK BY ID
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Book ID" });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE BOOK
const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({
            message: "Book updated successfully",
            book: updatedBook
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE BOOK
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
};