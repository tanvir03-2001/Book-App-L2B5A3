import { Request, Response } from "express";
import { formatError } from "../../utils/formateError";
import Book from "../book/book.model";
import Borrow from "./borrow.model";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
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

    const borrowRecord = await Borrow.create({
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
  } catch (error: any) {
    res.status(500).json(formatError(error));
  }
};

export const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (error: any) {
    res.status(500).json(formatError(error));
  }
};
