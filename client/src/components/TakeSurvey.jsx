
import { useState } from "react";
import { submitResponse } from "../api";
import { useSocket } from "../context/SocketProvider";
import { MdSend, MdEdit, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const TakeSurvey = ({ survey, onEdit, onDelete }) => {
  const [answers, setAnswers] = useState({});
  const socket = useSocket();

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      surveyId: survey._id,
      answers: survey.questions.map((q) => ({
        questionId: q._id,
        answer: answers[q._id] || "",
      })),
    };

    try {
      await submitResponse(payload);
      socket?.emit("new-response");
      toast.success("Survey submitted successfully!");
      setAnswers({});
    } catch (err) {
      toast.error("Failed to submit survey. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{survey.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(survey)}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-yellow-100 text-yellow-700 rounded-sm hover:bg-yellow-200 transition cursor-pointer font-semibold text-sm"
          >
            <MdEdit size={16} />
          </button>
          <button
            onClick={() => onDelete(survey)}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-red-100 text-red-600 rounded-sm hover:bg-red-200 transition cursor-pointer font-semibold text-sm"
          >
            <MdDelete size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {survey.questions.map((q, idx) => (
          <div key={q._id} className="p-3 bg-gray-50 rounded-xl shadow-sm">
            <p className="mb-2 font-medium text-gray-700 text-sm">
              {idx + 1}. {q.questionText}
            </p>

            {q.type === "text" && (
              <input
                type="text"
                value={answers[q._id] || ""}
                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              />
            )}

            {q.type === "mcq" && (
              <div className="flex flex-col gap-1.5">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-blue-50 text-sm"
                  >
                    <input
                      type="radio"
                      name={q._id}
                      value={opt}
                      checked={answers[q._id] === opt}
                      onChange={(e) =>
                        handleAnswerChange(q._id, e.target.value)
                      }
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 flex items-center cursor-pointer gap-2 px-5 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition mx-auto font-semibold text-sm"
      >
        <MdSend size={18} /> Submit Survey
      </button>
    </div>
  );
};

export default TakeSurvey;
