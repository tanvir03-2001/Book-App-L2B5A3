import { Router } from "express";
import { borrowBook } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/borrow", borrowBook);

export default borrowRoute;
