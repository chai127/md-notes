import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: [true, "Topic ID is required"],
      message: "Topic does not exist"
      },
    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
      minlength: [1, "Note content cannot be empty"]
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;