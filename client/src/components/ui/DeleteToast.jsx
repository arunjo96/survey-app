
import React from "react";
import toast from "react-hot-toast";

const DeleteToast = ({ surveyTitle, onConfirm, onCancel }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <span className="font-medium text-sm">Please confirm the delete  {surveyTitle}?</span>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          onClick={() => {
            onConfirm();
            toast.dismiss();
          }}
          className="px-3 py-1 bg-red-600 text-white rounded-md text-sm cursor-pointer"
        >
          Yes
        </button>
        <button
          onClick={() => {
            onCancel();
            toast.dismiss();
          }}
          className="px-3 py-1 bg-gray-300 text-black rounded-md text-sm cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteToast;
