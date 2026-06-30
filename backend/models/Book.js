const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    year: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    available: {
        type: Number,
        default: function () {
            return this.quantity;
        }
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Book", bookSchema);