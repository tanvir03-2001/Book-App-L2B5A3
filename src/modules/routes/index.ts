import { Router } from "express";
import bookRoute from "../book/book.route";
import borrowRoute from "../borrow/borrow.route";

const routers = Router();

routers.use("/api", bookRoute);
routers.use("/api", borrowRoute);

export default routers;
