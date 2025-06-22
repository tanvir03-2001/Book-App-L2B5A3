import { Request, Response } from "express";
import { formatError } from "../../utils/formateError";
import Book from "./book.model";

// Create book Post:/api/books
export const createBook = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const result = await Book.create(payload);
    const data = {
      success: true,
      message: "Book created successfully",
      data: result,
    };
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json(formatError(error));
  }
};

// Get All Books Get:/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const filterObj: any = {};
    if (filter) {
      filterObj.genre = filter;
    }

    let sortOption: any = {};
    if (sortBy && sort) {
      sortOption[sortBy as string] = sort === "asc" ? 1 : -1;
    }

    const limitNumber = limit ? parseInt(limit as string, 10) : 0;

    const books = await Book.find(filterObj)
      .sort(sortOption)
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json(formatError(error));
  }
};

// Get book by id Get:/api/books/:bookId
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

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
  } catch (error: any) {
    res.status(500).json(formatError(error));
  }
};

// /api/books/:bookId
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
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
  } catch (error) {
    res.status(500).json(formatError(error));
  }
};

// /api/books/:bookId
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);

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
  } catch (error) {
    res.status(500).json(formatError(error));
  }
};
