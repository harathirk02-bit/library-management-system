const Book = require("../models/Book");
const Issue = require("../models/Issue");

// Issue a Book
exports.issueBook = async (req, res) => {
    try {
        const { studentName, studentId, bookTitle, issueDate } = req.body;

        // Find Book
        const book = await Book.findOne({ title: bookTitle });

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Check Availability
        if (book.available <= 0) {
            return res.status(400).json({
                message: "Book not available"
            });
        }

        // Reduce Available Quantity
        book.available -= 1;
        await book.save();

        // Create Issue Record
        const issue = new Issue({
            studentName,
            studentId,
            bookTitle,
            issueDate,
            status: "Issued"
        });

        await issue.save();

        res.status(201).json({
            message: "Book issued successfully",
            issue
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// View All Issued Books
exports.getIssuedBooks = async (req, res) => {
    try {
        const issuedBooks = await Issue.find();
        res.json(issuedBooks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Return Book
exports.returnBook = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue record not found"
            });
        }

        if (issue.status === "Returned") {
            return res.status(400).json({
                message: "Book already returned"
            });
        }

        // Update Issue Status
        issue.status = "Returned";
        issue.returnDate = new Date();
        await issue.save();

        // Increase Available Quantity
        const book = await Book.findOne({ title: issue.bookTitle });

        if (book) {
            book.available += 1;
            await book.save();
        }

        res.json({
            message: "Book returned successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};