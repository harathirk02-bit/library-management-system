const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["Issued", "Returned"],
        default: "Issued"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Issue", issueSchema);