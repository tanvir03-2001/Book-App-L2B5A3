import { Model, model, Schema } from "mongoose";

const BookSchema = new Schema<IBook, Model<IBook>, BookBorrowMethods>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: [true, "ISBN must be unique"],
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies field is required"],
      min: [0, "Copies must be at positive value"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Methods
BookSchema.method("updateCopies", function updateCopies(borrowCopies) {
  this.copies = this.copies - Number(borrowCopies);
  if (this.copies == 0) {
    this.available = false;
  }
  this.save();
});

const Book = model("Book", BookSchema);
export default Book;
