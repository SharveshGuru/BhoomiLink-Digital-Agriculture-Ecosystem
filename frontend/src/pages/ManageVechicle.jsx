import { useState, useEffect } from "react"; 
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaTractor, FaImage } from "react-icons/fa";
import axiosInstance from "../api/Api";
import Popup from "../components/Popup";
import AddVehicle from "../components/AddVehicle";
import EditVehicle from "../components/EditVehicle";

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage, shouldRefresh]);

  const fetchVehicles = async (page) => {
    try {
      setLoading(true);
      const username = localStorage.getItem("username");
      const response = await axiosInstance.get(`/vehiclelisting/${username}?page=${page - 1}`);
      const data = response.data;
      setVehicles(data.data);
      setTotalPages(data.total);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await axiosInstance.delete(`/vehiclelisting/${vehicleId}`);
        setShouldRefresh((prev) => !prev);
        alert("Vehicle deleted successfully!");
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        alert("Failed to delete vehicle");
      }
    }
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    console.log(vehicle.id);
    setIsEditPopupOpen(true);  // Open Edit Popup
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Popup Toggle functions
  const handleAddPopupToggle = () => {
    setIsAddPopupOpen((prev) => !prev);
  };

  const handleEditPopupToggle = () => {
    setIsEditPopupOpen((prev) => !prev);
    setSelectedVehicle(null); // Clear selected vehicle when closing the edit popup
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center sm:text-left w-full sm:w-auto">
            Manage Your Equipments
          </h2>
          <button
            onClick={handleAddPopupToggle}  
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer text-sm sm:text-base"
          >
            Add New Vehicle
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-12">
            <FaTractor className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No vehicles added yet</h3>
            <p className="mt-1 text-gray-500">Add your first vehicle to get started.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-40 sm:h-48 bg-gray-100 flex items-center justify-center">
                    {vehicle.image ? (
                      <img
                        src={`data:image/jpeg;base64,${vehicle.image}`}
                        alt={vehicle.vehicleType}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaImage className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400" />
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-1">{vehicle.vehicleType}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Plate: {vehicle.plateNumber}</p>
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-xs sm:text-sm font-medium">price: {vehicle.price} rs</span>
                      <span className="text-xs sm:text-sm font-medium">{vehicle.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(vehicle)}  // Open Edit Vehicle Popup
                        className="w-full py-1.5 sm:py-2 rounded-lg text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <FaEdit className="h-3 w-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="w-full py-1.5 sm:py-2 rounded-lg text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <FaTrash className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 sm:mt-8 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg shadow-sm">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs sm:text-sm font-medium rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs sm:text-sm font-medium rounded-md ${currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"}`}
                  >
                    <FaChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                                        if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium ${
                          currentPage === pageNum
                            ? "bg-green-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"}`}
                  >
                    <FaChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Vehicle Popup */}
      <Popup isOpen={isAddPopupOpen} onClose={handleAddPopupToggle}>
        <AddVehicle
          onAdd={() => {
            setShouldRefresh((prev) => !prev);
            setIsAddPopupOpen(false);
            alert("successfully added!")
             // Close popup after adding vehicle
          }}
          onCancel={handleAddPopupToggle}
        />
      </Popup>

      {/* Edit Vehicle Popup */}
      <Popup isOpen={isEditPopupOpen} onClose={handleEditPopupToggle}>
        <EditVehicle
          vehicle={selectedVehicle}
          onEditSuccess={() => {
            setShouldRefresh((prev) => !prev); // Refresh the list
            setIsEditPopupOpen(false);
            alert("successfully updated!") // Close popup after editing
          }}
          onCancel={handleEditPopupToggle}
        />
      </Popup>
    </div>
  );
}
