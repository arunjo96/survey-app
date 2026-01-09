
import { useState, useEffect } from "react";
import { createSurvey, updateSurvey } from "../api";
import { MdDelete, MdAdd, MdAddCircleOutline, MdSend } from "react-icons/md";

const CreateSurvey = ({ surveyToEdit, onCreateOrUpdate }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", type: "text", options: [""] },
  ]);

  useEffect(() => {
    if (surveyToEdit) {
      setTitle(surveyToEdit.title);
      setQuestions(surveyToEdit.questions);
    }
  }, [surveyToEdit]);

  const handleQuestionChange = (qIndex, key, value) => {
    const updated = [...questions];
    updated[qIndex][key] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", type: "text", options: [""] },
    ]);
  };

  const removeQuestion = (index) =>
    setQuestions(questions.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    try {
      if (surveyToEdit)
        await updateSurvey(surveyToEdit._id, { title, questions });
      else await createSurvey({ title, questions });

      setTitle("");
      setQuestions([{ questionText: "", type: "text", options: [""] }]);
      onCreateOrUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-8 p-6 bg-slate-100 rounded-xl shadow-md max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <MdAddCircleOutline size={24} className="text-blue-500" />
        {surveyToEdit ? "Edit Survey" : "Create Survey"}
      </h3>

      <input
        type="text"
        placeholder="Survey Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
      />

      <div className="max-h-72 overflow-y-auto pr-1 mb-4">
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="mb-3 p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "questionText", e.target.value)
                }
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              {questions.length > 1 && (
                <MdDelete
                  size={22}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => removeQuestion(qIndex)}
                />
              )}
            </div>

            <select
              value={q.type}
              onChange={(e) =>
                handleQuestionChange(qIndex, "type", e.target.value)
              }
              className="mb-2 p-2 border border-gray-300 rounded-md cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="text">Text</option>
              <option value="mcq">Multiple Choice</option>
            </select>

            {q.type === "mcq" &&
              q.options.map((opt, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="w-full mb-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              ))}

            {q.type === "mcq" && (
              <button
                onClick={() => addOption(qIndex)}
                className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition mt-1 font-medium text-sm"
              >
                <MdAddCircleOutline /> Add Option
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={addQuestion}
          className=" cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 font-medium text-sm"
        >
          <MdAdd /> Add Question
        </button>

        <button
          onClick={handleSubmit}
          className=" cursor-pointer flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium text-sm"
        >
          <MdSend /> {surveyToEdit ? "Update Survey" : "Create Survey"}
        </button>
      </div>
    </div>
  );
};

export default CreateSurvey;
