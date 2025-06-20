import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./book.controller";

const bookRoute = Router();

bookRoute.post("/books", createBook);
bookRoute.get("/books", getAllBooks);
bookRoute.get("/books/:bookId", getBookById);
bookRoute.put("/books/:bookId", updateBook);
bookRoute.delete("/books/:bookId", deleteBook);

export default bookRoute;
