
import { Schema, model } from "mongoose";


const questionSchema = new Schema({
  questionText: { type: String, required: true },
  type: {
    type: String,
    enum: ["mcq", "text"],
    required: true,
  },
  options: [String],
});

const surveySchema = new Schema(
  {
    title: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [questionSchema],
  },
  { timestamps: true }
);

const Survey = model("Survey", surveySchema);
export default Survey;

