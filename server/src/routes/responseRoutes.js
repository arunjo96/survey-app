import express from "express";
import { submitResponse, getSurveyResponses } from "../controllers/responseController.js";
import { protect } from "../middleware/authMiddleware.js";

const responseRouter = express.Router();

responseRouter.post("/", protect, submitResponse);

responseRouter.get("/:surveyId", protect, getSurveyResponses);

export default responseRouter;