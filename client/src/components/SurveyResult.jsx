
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getSurveyResponses } from "../api";
import { useSocket } from "../context/SocketProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const colors = [
  "#60a5fa",
  "#34d399",
  "#f87171",
  "#fbbf24",
  "#a78bfa",
  "#f472b6",
  "#22d3ee",
];

const SurveyResult = ({ survey }) => {
  const [responses, setResponses] = useState([]);
  const socket = useSocket();

  const fetchResponses = async () => {
    if (!survey) return;
    const res = await getSurveyResponses(survey._id);
    setResponses(res.data.responses || []);
  };

  useEffect(() => {
    fetchResponses();
  }, [survey]);

  useEffect(() => {
    if (!socket) return;
    socket.on("update-results", fetchResponses);
    return () => socket.off("update-results", fetchResponses);
  }, [socket, survey]);

  if (!survey) return null;

  const allLabels = [];
  survey.questions.forEach((q) => {
    if (q.type === "mcq") {
      q.options.forEach((opt) => {
        if (!allLabels.includes(opt)) allLabels.push(opt);
      });
    } else {
      responses.forEach((r) => {
        const ansObj = r.answers.find((a) => a.questionId === q._id);
        if (ansObj && ansObj.answer && !allLabels.includes(ansObj.answer)) {
          allLabels.push(ansObj.answer);
        }
      });
    }
  });

  if (allLabels.length === 0) {
    return <p className="text-gray-500">No data to display chart</p>;
  }

  const datasets = survey.questions.map((q, index) => {
    const counts = {};
    allLabels.forEach((l) => (counts[l] = 0));

    responses.forEach((r) => {
      const ansObj = r.answers.find((a) => a.questionId === q._id);
      if (
        ansObj &&
        ansObj.answer !== undefined &&
        counts[ansObj.answer] !== undefined
      ) {
        counts[ansObj.answer]++;
      }
    });

    return {
      label: q.questionText,
      data: allLabels.map((l) => counts[l] || 0),
      backgroundColor: colors[index % colors.length],
      borderRadius: 4,
    };
  });

  const data = { labels: allLabels, datasets };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 4,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      title: {
        display: true,
        text: `${survey.title} - Survey Results`,
        font: { size: 15 },
      },
    },
    scales: {
      x: { stacked: true, beginAtZero: true, grid: { display: false } },
      y: { stacked: true, grid: { display: false } },
    },
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <Bar data={data} options={options} />
      <p className="text-sm text-gray-600 font-medium">
        Based on {responses.length}{" "}
        {responses.length === 1 ? "response" : "responses"}
      </p>
    </div>
  );
};

export default SurveyResult;


