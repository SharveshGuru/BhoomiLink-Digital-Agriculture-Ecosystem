import { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import { FaChevronLeft, FaChevronRight, FaUsers } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

export default function WorkerListing() {
  const [workers, setWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkers(currentPage);
  }, [currentPage]);

  const fetchWorkers = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/workers?page=${page - 1}`);
      const data = response.data;
      setWorkers(data.data || []);
      setTotalPages(data.total || 1);
    } catch (error) {
      console.error("Error fetching workers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHire = async (worker) => {
    try {
      await axiosInstance.post(`/hire/${worker.username}`);
      alert(`You have successfully hired ${worker.name}`);
      fetchWorkers(currentPage);
    } catch (error) {
      console.error("Error hiring worker:", error);
      alert("Failed to hire worker. Please try again.");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-6 sm:py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 flex items-center gap-2">
            Workforce Hiring
          </h2>
        </div>

        {/* Loading / Empty State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
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
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleHire(worker)}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition-all duration-300"
                        >
                          Hire
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
                        : "bg-white text-gray-700 hover:bg-gray-50"
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
                            : "bg-white text-gray-700 hover:bg-gray-50"
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
                        : "bg-white text-gray-700 hover:bg-gray-50"
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
    </div>
  );
}
