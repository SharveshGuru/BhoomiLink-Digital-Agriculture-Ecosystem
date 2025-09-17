import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaUsers } from "react-icons/fa";
import axiosInstance from "../api/Api";

export default function Employments() {
  // For workers - employments where user is the employee
  const [employedJobs, setEmployedJobs] = useState([]);
  const [employedCurrentPage, setEmployedCurrentPage] = useState(1);
  const [employedTotalPages, setEmployedTotalPages] = useState(1);

  // For farmers - employments where user is the requester
  const [requestedJobs, setRequestedJobs] = useState([]);
  const [requestedCurrentPage, setRequestedCurrentPage] = useState(1);
  const [requestedTotalPages, setRequestedTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");
  const isFarmer = localStorage.getItem("isFarmer") === "true";
  const isWorker = localStorage.getItem("isWorker") === "true";

  useEffect(() => {
    if (isWorker) {
      fetchEmployedJobs(employedCurrentPage);
    }
    if (isFarmer) {
      fetchRequestedJobs(requestedCurrentPage);
    }
  }, [employedCurrentPage, requestedCurrentPage]);

  const fetchEmployedJobs = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/employment/employee/${username}?page=${page - 1}`
      );
      setEmployedJobs(response.data.data);
      setEmployedTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching employed jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestedJobs = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/employment/requester/${username}?page=${page - 1}`
      );
      setRequestedJobs(response.data.data);
      setRequestedTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching requested jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWorker = async (workerUsername) => {
    if (window.confirm("Are you sure you want to remove this worker from employment?")) {
      try {
        await axiosInstance.delete(`/employment/${workerUsername}`);
        alert("Worker removed from employment successfully!");
        // Refresh the requested jobs list
        fetchRequestedJobs(requestedCurrentPage);
      } catch (error) {
        console.error("Error removing worker:", error);
        alert("Failed to remove worker. Please try again.");
      }
    }
  };

  const Pagination = ({ currentPage, totalPages, onPrev, onNext, setPage }) => (
    <div className="flex items-center justify-between mt-6 sm:mt-8 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg shadow-sm">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Showing page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>
        <div className="flex space-x-2">
          <button
            onClick={onPrev}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-gray-300 text-sm font-medium ${
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
                onClick={() => setPage(pageNum)}
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
            onClick={onNext}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-3 py-1.5 rounded-r-md border border-gray-300 text-sm font-medium ${
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
  );

  const renderEmploymentsTable = (employments, isRequested = false) => (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              {isRequested ? "Worker" : "Employer"}
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Phone
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Start Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              End Date
            </th>
            {isRequested && (
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employments.map((employment) => {
            const person = isRequested ? employment.employee : employment.requester;
            return (
              <tr key={employment.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{person?.name}</td>
                <td className="px-4 py-2 text-sm">{person?.email}</td>
                <td className="px-4 py-2 text-sm">{person?.phonenumber}</td>
                <td className="px-4 py-2 text-sm">
                  {formatDate(employment.beginDate)}
                </td>
                <td className="px-4 py-2 text-sm">
                  {formatDate(employment.finishDate)}
                </td>
                {isRequested && (
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveWorker(person?.username)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg shadow transition-all duration-300 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return "-";

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* My Jobs - For Workers */}
        {isWorker && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
              My Jobs
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : employedJobs.length === 0 ? (
              <div className="text-center py-12">
                <FaUsers className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  You are not employed by anyone currently.
                </h3>
              </div>
            ) : (
              <>
                {renderEmploymentsTable(employedJobs, false)}
                <Pagination
                  currentPage={employedCurrentPage}
                  totalPages={employedTotalPages}
                  onPrev={() => setEmployedCurrentPage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setEmployedCurrentPage((p) =>
                      p < employedTotalPages ? p + 1 : p
                    )
                  }
                  setPage={setEmployedCurrentPage}
                />
              </>
            )}
          </>
        )}

        {/* Workers I Hired - For Farmers */}
        {isFarmer && (
          <>
            <h2 className={`text-2xl sm:text-3xl font-bold text-green-800 mb-4 ${isWorker ? 'mt-10' : ''}`}>
              Workers I Hired
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : requestedJobs.length === 0 ? (
              <div className="text-center py-12">
                <FaUsers className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  You have not hired any workers currently.
                </h3>
              </div>
            ) : (
              <>
                {renderEmploymentsTable(requestedJobs, true)}
                <Pagination
                  currentPage={requestedCurrentPage}
                  totalPages={requestedTotalPages}
                  onPrev={() => setRequestedCurrentPage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setRequestedCurrentPage((p) =>
                      p < requestedTotalPages ? p + 1 : p
                    )
                  }
                  setPage={setRequestedCurrentPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}