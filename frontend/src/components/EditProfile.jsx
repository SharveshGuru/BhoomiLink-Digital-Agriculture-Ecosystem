import { useState } from "react";
import axiosInstance from "../api/Api";

export default function EditProfile({ userData = {},onClose }) {
  const [formData, setFormData] = useState({
    name: userData.name || "",
    username: userData.username || "",
    email: userData.email || "",
    phonenumber: userData.phonenumber || "",
    address: userData.address || "",
    userType: userData.userType || "User",
    isVehicleOwner: userData.isVehicleOwner || false,
    isFarmer: userData.isFarmer || false,
    isWorker: userData.isWorker || false,
    isMerchant: userData.isMerchant || false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await axiosInstance.put(`/user/${userData.username}`, formData);
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      setSuccessMessage("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-xl font-semibold text-emerald-700">
          Edit Profile
        </h2>

        

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <span className="block text-gray-700 mb-1 font-semibold">Roles</span>
          {[
            { name: "isVehicleOwner", label: "Vehicle Owner" },
            { name: "isFarmer", label: "Farmer" },
            { name: "isWorker", label: "Worker" },
            { name: "isMerchant", label: "Merchant" },
          ].map((role) => (
            <label key={role.name} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name={role.name}
                checked={formData[role.name]}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">{role.label}</span>
            </label>
          ))}
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
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full border border-emerald-600 text-gray-700 py-2 rounded hover:bg-emerald-200 transition cursor-pointer"
        >
          Cancel
        </button>

        {successMessage && (
          <div
            className={`mt-4 p-3 rounded text-white ${
              successMessage.includes("successfully")
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {successMessage}
          </div>
        )}

      </form>
    </div>
  );
}
