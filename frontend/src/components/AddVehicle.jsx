// src/components/AddVehicle.jsx
import { useState } from "react";
import axiosInstance from "../api/Api";

export default function AddVehicle({ onAdd, onCancel }) {
  const [vehicleType, setVehicleType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!vehicleType.trim() || !price) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", localStorage.getItem("username")); // backend expects this
      formData.append("vehicleType", vehicleType.trim());
      formData.append("price", parseFloat(price));
      if (image) {
        formData.append("image", image);
      }

      await axiosInstance.post("/vehiclelisting", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onAdd(); // refresh vehicle list in parent
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setErrorMsg("Failed to add vehicle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md space-y-4 w-full max-w-md"
    >
      <h3 className="text-xl font-semibold text-green-800">Add Vehicle</h3>

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      {/* Vehicle Type - free text */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Vehicle Type
        </label>
        <input
          type="text"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          placeholder="e.g., Tractor, Harvester"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price (₹)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Vehicle Image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Vehicle"}
        </button>
      </div>
    </form>
  );
}
