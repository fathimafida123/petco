import React from "react";

function ConfirmationModal({
  show,
  title = "Are you sure?",
  message = "Do you want to continue?",
  onCancel,
  onConfirm,
  confirmText = "Confirm",
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="w-80 bg-white rounded-2xl shadow-xl p-6">

        <h2 className="text-xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="text-gray-500 mt-2">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmationModal;