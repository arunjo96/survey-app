
import { useState, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import CreateSurvey from "../components/CreateSurvey";
import TakeSurvey from "../components/TakeSurvey";
import SurveyResult from "../components/SurveyResult";
import { getAllSurveys, deleteSurvey } from "../api";
import { useSocket } from "../context/SocketProvider";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import DeleteToast from "../components/ui/DeleteToast";

const Dashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const socket = useSocket();


  const user = JSON.parse(localStorage.getItem("user"));

  const fetchSurveys = async () => {
    try {
      const res = await getAllSurveys();
      setSurveys(res.data.surveys);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch surveys");
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("survey-created", fetchSurveys);
    socket.on("survey-updated", fetchSurveys);
    socket.on("survey-deleted", (id) =>
      setSurveys((prev) => prev.filter((s) => s._id !== id))
    );
    return () => {
      socket.off("survey-created", fetchSurveys);
      socket.off("survey-updated", fetchSurveys);
      socket.off("survey-deleted");
    };
  }, [socket]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; 
  };

  const handleDelete = (survey) => {
    toast((t) => (
      <DeleteToast
        surveyTitle={survey.title}
        onConfirm={async () => {
          try {
            await deleteSurvey(survey._id);
            setIsModalOpen(false);
            setSelectedSurvey(null);
            setSurveys((prev) => prev.filter((s) => s._id !== survey._id));
            toast.success(`${survey.title} deleted successfully!`);
          } catch {
            toast.error("Delete failed!");
          }
        }}
        onCancel={() => toast.dismiss(t.id)}
      />
    ));
  };

  const handleCreateOrUpdate = () => {
    setEditingSurvey(null);
    setSelectedSurvey(null);
    fetchSurveys();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.name} onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <CreateSurvey
          surveyToEdit={editingSurvey}
          onCreateOrUpdate={handleCreateOrUpdate}
        />

        <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3 text-slate-700">
          Available Surveys
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {surveys.map((survey) => (
            <div
              key={survey._id}
              className="bg-slate-100 p-4 sm:p-5 rounded-2xl hover:shadow-md transition transform hover:-translate-y-1"
            >
              <h4 className="font-semibold text-base sm:text-lg mb-1">
                {survey.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                {survey.questions.length} question
                {survey.questions.length !== 1 && "s"}
              </p>
              <button
                onClick={() => {
                  setSelectedSurvey(survey);
                  setIsModalOpen(true);
                }}
                className="cursor-pointer mt-1 w-full px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium text-sm sm:text-base transition"
              >
                Take Survey
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && selectedSurvey && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl animate-fadeIn">
              <div className="sticky top-0 z-20 bg-gray-100 border-b border-gray-200 px-4 py-2 flex justify-end items-center">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedSurvey(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-gray-200 transition cursor-pointer"
                >
                  <MdClose size={20} />
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-100">
                <TakeSurvey
                  survey={selectedSurvey}
                  onEdit={(s) => {
                    setEditingSurvey(s);
                    setIsModalOpen(false);
                    setSelectedSurvey(null);
                  }}
                  onDelete={handleDelete}
                />
                <SurveyResult survey={selectedSurvey} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
