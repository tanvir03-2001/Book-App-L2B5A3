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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const formateError_1 = require("../../utils/formateError");
const book_model_1 = __importDefault(require("./book.model"));
// Create book Post:/api/books
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const result = yield book_model_1.default.create(payload);
        const data = {
            success: true,
            message: "Book created successfully",
            data: result,
        };
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json((0, formateError_1.formatError)(error));
    }
});
exports.createBook = createBook;
// Get All Books Get:/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const filterObj = {};
        if (filter) {
            filterObj.genre = filter;
        }
        let sortOption = {};
        if (sortBy && sort) {
            sortOption[sortBy] = sort === "asc" ? 1 : -1;
        }
        const limitNumber = limit ? parseInt(limit, 10) : 0;
        const books = yield book_model_1.default.find(filterObj)
            .sort(sortOption)
            .limit(limitNumber);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json((0, formateError_1.formatError)(error));
    }
});
exports.getAllBooks = getAllBooks;
// Get book by id Get:/api/books/:bookId
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json((0, formateError_1.formatError)(error));
    }
});
exports.getBookById = getBookById;
// /api/books/:bookId
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updateData = req.body;
        const updatedBook = yield book_model_1.default.findByIdAndUpdate(bookId, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(500).json((0, formateError_1.formatError)(error));
    }
});
exports.updateBook = updateBook;
// /api/books/:bookId
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deletedBook = yield book_model_1.default.findByIdAndDelete(bookId);
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json((0, formateError_1.formatError)(error));
    }
});
exports.deleteBook = deleteBook;
