"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BorrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book id is required"],
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Must borrow at least one copy"],
    },
    dueDate: {
        type: Date,
        required: [true, "DueDate id is required"],
    },
}, { timestamps: true, versionKey: false });
const Borrow = (0, mongoose_1.model)("Borrow", BorrowSchema);
exports.default = Borrow;
