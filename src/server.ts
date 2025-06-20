import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "./config/dbConnect";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// server PORT
const PORT = process.env.PORT || 5000;

// Server running on
app.listen(PORT, async () => {
  console.log(`server is running PORT ${PORT}`);
  try {
    await dbConnect();
  } catch (err) {
    console.log("DB Connect Error");
    console.log(err);
  }
});

export default app;
