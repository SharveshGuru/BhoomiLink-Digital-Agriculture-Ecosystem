import { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import { FaChevronLeft, FaChevronRight, FaUsers } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import HireWorker from "../components/HireWorker";

export default function WorkerListing() {
  const [workers, setWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isHirePopupOpen, setIsHirePopupOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const navigate = useNavigate();
  const isFarmer = localStorage.getItem("isFarmer") === "true";
  const isWorker = localStorage.getItem("isWorker") === "true";

  useEffect(() => {
    fetchWorkers(currentPage);
  }, [currentPage, shouldRefresh]);

  const fetchWorkers = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/workers?page=${page - 1}`);
      const data = response.data;
      const loggedInUser = localStorage.getItem("username");
      // Filter out the logged-in user from workers list
      const filteredWorkers = (data.data || []).filter(
        (worker) => worker.username !== loggedInUser
      );
      
      setWorkers(filteredWorkers);
      setTotalPages(data.total || 1);
    } catch (error) {
      console.error("Error fetching workers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHirePopupToggle = (worker = null) => {
    setSelectedWorker(worker);
    setIsHirePopupOpen(!isHirePopupOpen);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 flex items-center gap-2">
            Worker Listing
          </h2>
          
          {/* Navigation Buttons */}
          {(isFarmer || isWorker) && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/employments")}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer text-sm sm:text-base"
              >
                View Employments
              </button>
            </div>
          )}
        </div>

        {/* Loading / Empty State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center py-12">
            <FaUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No workers available
            </h3>
            <p className="mt-1 text-gray-500">Check back later.</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-green-900">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-green-900">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-green-900">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-green-900">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-green-900">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-green-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {workers.map((worker) => (
                    <tr
                      key={worker.id}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {worker.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {worker.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {worker.phonenumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {worker.address}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          worker.isAvailable 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {worker.isAvailable ? "Available" : "Hired"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleHirePopupToggle(worker)}
                          disabled={!isFarmer || !worker.isAvailable} 
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg shadow transition-all duration-300 ${
                            isFarmer && worker.isAvailable
                              ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {worker.isAvailable ? "Hire" : "Not Available"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 bg-white px-4 py-3 rounded-lg shadow-sm">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 border border-gray-300 text-xs font-medium rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`ml-3 px-3 py-2 border border-gray-300 text-xs font-medium rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>

              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{currentPage}</span>{" "}
                  of <span className="font-medium">{totalPages}</span>
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 rounded-l-md border border-gray-300 text-sm font-medium ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <FaChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1.5 border border-gray-300 text-sm font-medium ${
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
                    className={`px-3 py-1.5 rounded-r-md border border-gray-300 text-sm font-medium ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <FaChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hire Worker Popup */}
      <Popup isOpen={isHirePopupOpen} onClose={handleHirePopupToggle}>
        {selectedWorker && (
          <HireWorker
            worker={selectedWorker}
            onClose={handleHirePopupToggle}
            onHireSuccess={() => {
              setShouldRefresh(prev => !prev);
              alert("Worker hired successfully!");
              handleHirePopupToggle();
            }}
          />
        )}
      </Popup>
    </div>
  );
}