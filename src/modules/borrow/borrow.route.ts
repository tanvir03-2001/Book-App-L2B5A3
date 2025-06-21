import { Router } from "express";
import { borrowBook, getBorrowedBooksSummary } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/borrow", borrowBook);
borrowRoute.get("/borrow", getBorrowedBooksSummary);

export default borrowRoute;
