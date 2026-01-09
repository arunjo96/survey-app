import { Router } from "express";
import { createSurvey, getMySurveys, updateSurvey, deleteSurvey } from "../controllers/surveyController.js";
import { protect } from "../middleware/authMiddleware.js";

const surveyRouter = Router();


surveyRouter.post("/", protect, createSurvey);

surveyRouter.get("/", protect, getMySurveys);

surveyRouter.put("/:surveyId", protect, updateSurvey);

surveyRouter.delete("/:surveyId", protect, deleteSurvey);

export default surveyRouter;
