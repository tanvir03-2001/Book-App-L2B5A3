import { model, Schema } from "mongoose";

const BorrowSchema = new Schema<any>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book id is required"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Must borrow at least one copy"],
    },
    dueDate: {
      type: Date,
      required: [true, "DueDate id is required"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Borrow = model("Borrow", BorrowSchema);
export default Borrow;
