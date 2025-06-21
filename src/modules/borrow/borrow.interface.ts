import { Types } from "mongoose";

export interface IBorrow extends IBook {
  book: Types.ObjectId; // Reference to Book model
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
