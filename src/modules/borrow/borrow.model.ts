import { model, Schema } from "mongoose";

const BorrowSchema = new Schema<any>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Must borrow at least one copy"],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const borrow = model("Borrow", BorrowSchema);
export default borrow;
