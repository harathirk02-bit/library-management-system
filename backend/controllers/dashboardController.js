const Book = require("../models/Book");
const Issue = require("../models/Issue");

// Dashboard Statistics
exports.getDashboard = async (req, res) => {
    try {
        // Total number of books
        const totalBooks = await Book.countDocuments();

        // Total available book copies
        const availableBooks = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$available" }
                }
            }
        ]);

        // Total issued books
        const issuedBooks = await Issue.countDocuments({
            status: "Issued"
        });

        // Returned today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const returnedToday = await Issue.countDocuments({
            status: "Returned",
            returnDate: {
                $gte: today,
                $lt: tomorrow
            }
        });

        // Total unique students who borrowed books
        const students = await Issue.distinct("studentId");

        res.json({
            totalBooks,
            availableBooks: availableBooks.length ? availableBooks[0].total : 0,
            issuedBooks,
            returnedToday,
            totalStudents: students.length
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};