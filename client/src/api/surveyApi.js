
import axiosInstance from "../utills/storeAPI";

export const createSurvey = (data) =>
  axiosInstance.post("/surveys", data);

export const getAllSurveys = () =>
  axiosInstance.get("/surveys");

export const updateSurvey = (surveyId, data) =>
  axiosInstance.put(`/surveys/${surveyId}`, data);

export const deleteSurvey = (surveyId) =>
  axiosInstance.delete(`/surveys/${surveyId}`);
