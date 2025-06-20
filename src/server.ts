import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import dbConnect from "./config/dbConnect";
import routers from "./modules/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// user routers
app.use(routers);

// home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ success: true, massage: "Server is running..." });
});

// Server running on
async function server() {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT} `);
    });
  } catch (error) {
    console.error(`Server error ${error}`);
  }
}

server();
