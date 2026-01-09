
import Survey from "../models/Survey.js";

export const createSurvey = async (req, res) => {
  try {
    const survey = await Survey.create({
      title: req.body.title,
      questions: req.body.questions,
      createdBy: req.user.id,
    });

    req.io.emit("survey-created");

    return res.status(201).json({
      success: true,
      message: "Survey created successfully",
      survey,
    });
  } catch (error) {
    console.error("Error creating survey:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create survey",
      error: error.message,
    });
  }
};

export const getMySurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ createdBy: req.user.id });

    return res.status(200).json({
      success: true,
      count: surveys.length,
      surveys,
    });
  } catch (error) {
    console.error("Error fetching surveys:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch surveys",
    });
  }
};


export const updateSurvey = async (req, res) => {
  try {
    const { surveyId } = req.params;

    const survey = await Survey.findOne({
      _id: surveyId,
      createdBy: req.user.id,
    });

    if (!survey) {
      return res.status(404).json({
        success: false,
        message: "Survey not found or you are not authorized to update it",
      });
    }

    survey.title = req.body.title;
    survey.questions = req.body.questions;

    await survey.save();

    req.io.emit("survey-updated", survey._id);

    return res.status(200).json({
      success: true,
      message: "Survey updated successfully",
      survey,
    });
  } catch (error) {
    console.error("Update Survey Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update survey",
    });
  }
};

export const deleteSurvey = async (req, res) => {
  try {
    const { surveyId } = req.params;

    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({
        success: false,
        message: "Survey not found",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (survey.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this survey",
      });
    }

    await survey.deleteOne();

    req.io?.emit("survey-deleted", surveyId);

    return res.status(200).json({
      success: true,
      message: "Survey deleted successfully",
    });
  } catch (error) {
    console.error("Delete Survey Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete survey",
    });
  }
};

