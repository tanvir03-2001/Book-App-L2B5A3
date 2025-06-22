"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedBooksSummary = exports.borrowBook = void 0;
const formateError_1 = require("../../utils/formateError");
const book_model_1 = __importDefault(require("../book/book.model"));
const borrow_model_1 = __importDefault(require("./borrow.model"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({ success: false, message: "Book not found" });
            return;
        }
        if (book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: "Not enough copies available",
                data: null,
            });
            return;
        }
        const borrowRecord = yield borrow_model_1.default.create({
            book: bookId,
            quantity,
            dueDate,
        });
        if (borrowRecord._id) {
            book.updateCopies(quantity); // Make sure this is async-safe
            res.status(200).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrowRecord,
            });
        }
    }
    catch (error) {
        res.status(500).json((0, formateError_1.formatError)(error));
    }
});
exports.borrowBook = borrowBook;
const getBorrowedBooksSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json((0, formateError_1.formatError)(error));
    }
});
exports.getBorrowedBooksSummary = getBorrowedBooksSummary;
