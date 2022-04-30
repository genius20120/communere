import mongoose from "mongoose";

const Schema = mongoose.Schema;
const toDoSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["in_progress", "done"],
    default: "in_progress",
  },
  dueDate: {
    type: Date,
  },
  softDelete: {
    type: Boolean,
    default: false,
  },
});
toDoSchema.set("timestamps", true);

export const ToDo = mongoose.model("Todo", toDoSchema);
