import { Request, Response } from "express";
import Book from "../book/book.model";
import borrow from "./borrow.model";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
    }

    // Borrow record
    const borrowRecord = await borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    if (borrowRecord._id) {
      book.updateCopies(quantity);

      return res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error: error.message || "Internal Server Error",
    });
  }
};
