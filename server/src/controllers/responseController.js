
import Response from "../models/Response.js";
import { emitSurveyUpdate } from "../config/socket.js";

export const submitResponse = async (req, res) => {
  try {
    const savedResponse = await Response.create(req.body);

    emitSurveyUpdate();

    return res.status(201).json({
      success: true,
      message: "Response submitted successfully",
       savedResponse,
    });
  } catch (error) {
    console.error("Error submitting response:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit response",
      error: error.message,
    });
  }
};

export const getSurveyResponses = async (req, res) => {
  try {
    const { surveyId } = req.params;

    const responses = await Response.find({ surveyId });

    return res.status(200).json({
      success: true,
      count: responses.length,
       responses,
    });
  } catch (error) {
    console.error("Error fetching survey responses:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch survey responses",
    });
  }
};
