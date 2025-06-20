import { model, Schema } from "mongoose";

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  isbn: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  copies: {
    type: Number,
    require: true,
  },
  available: {
    type: Boolean,
    require: true,
  },
});

const Book = model("user", BookSchema);
export default Book;
