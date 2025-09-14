import { useState } from "react";
import axiosInstance from "../api/Api";

export default function RentEquipment({ vehicle, onClose, onSuccess }) {
  const [beginDate, setBeginDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!beginDate || !finishDate) {
      setErrorMsg("Please select both start and end dates.");
      return;
    }
    if (new Date(finishDate) <= new Date(beginDate)) {
      setErrorMsg("End date must be later than start date.");
      return;
    }

    try {
      setLoading(true);
      const username = localStorage.getItem("username");
      await axiosInstance.post("/vehiclerental", {
        vehicle: { id: vehicle.id },
        borrower: { username },
        beginDate,
        finishDate,
      });

      onSuccess();
    } catch (error) {
      console.error("Error creating rental:", error);
      setErrorMsg("Failed to rent equipment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg mx-auto">
      <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-6 text-center">
        Rent {vehicle.vehicleType}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Begin Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            value={beginDate}
            onChange={(e) => setBeginDate(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Finish Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            value={finishDate}
            onChange={(e) => setFinishDate(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition cursor-pointer"
          >
            {loading ? "Renting..." : "Confirm Rent"}
          </button>
        </div>
      </form>
    </div>
  );
}
