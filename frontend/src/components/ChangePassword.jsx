import { useState } from "react";
import axiosInstance from "../api/Api";

export default function ChangePassword({ username, onClose }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      setIsSubmitting(true);
      await axiosInstance.put(`/user/changepassword/${username}`, password, {
        headers: { "Content-Type": "text/plain" }, // sending raw string
      });
      setMessage("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password update error:", error);
      setMessage("Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-xl font-semibold text-emerald-700">
          Change Password
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white font-semibold py-2 rounded transition cursor-pointer ${
            isSubmitting
              ? "bg-emerald-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>

        {message && (
          <div
            className={`mt-4 p-3 rounded text-white ${
              message.includes("successfully") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full border border-emerald-600 text-gray-700 py-2 rounded hover:bg-emerald-200 transition cursor-pointer"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
