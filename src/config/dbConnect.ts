import mongoose from "mongoose";

export default async function dbConnect() {
  // connect database in mongodb in mongoose
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connect To Database...");
  } catch (error: any) {
    console.log(error);
  }
}
