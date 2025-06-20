import { Router } from "express";
import bookRoute from "../book/book.route";

const routers = Router();

routers.use("/api", bookRoute);

export default routers;
