import { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi";
import axiosInstance from "../api/Api";

export default function EditVehicle({ vehicle, onEditSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    vehicleType: vehicle.vehicleType || "",
    price: vehicle.price || "",
    isAvailable: vehicle.isAvailable ?? true,
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicle.imageUrl) {
      setImagePreview(vehicle.imageUrl); // backend should return a URL if image exists
    }
    // console.log(vehicle);
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "price" ? Number(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setFormData((prev) => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("vehicleType", formData.vehicleType);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("isAvailable", formData.isAvailable);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await axiosInstance.put(`/vehiclelisting/${vehicle.id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      onEditSuccess();
    } catch (error) {
      console.error("Error updating vehicle:", error);
      alert("Failed to update vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-800">Edit Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vehicle Type (free text) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
            <input
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="e.g., Tractor, Harvester"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            <label className="text-sm text-gray-700">Available for Rent</label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Vehicle Image</label>
          <div className="flex items-center gap-4">
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiImage className="w-8 h-8 text-gray-400" />
                  <p className="text-xs text-gray-500">Upload Image</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            <p className="text-sm text-gray-500">Optional: Upload a new image</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-emerald-600 rounded-md text-sm text-gray-700 bg-white hover:bg-emerald-200 transition cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}
