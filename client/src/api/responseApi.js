
import axiosInstance from "../utills/storeAPI";

export const submitResponse = (data) =>
  axiosInstance.post("/responses", data);

export const getSurveyResponses = (surveyId) =>
  axiosInstance.get(`/responses/${surveyId}`);
