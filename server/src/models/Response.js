
import { Schema, model } from "mongoose";

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const responseSchema = new Schema(
  {
    surveyId: {
      type: Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    answers: [answerSchema],
  },
  { timestamps: true }
);


const Response = model("Response", responseSchema);

export default Response;


