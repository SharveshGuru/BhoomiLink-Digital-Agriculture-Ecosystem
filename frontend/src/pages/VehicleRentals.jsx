import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import axiosInstance from "../api/Api";

export default function VehicleRentals() {
  const [borrowedRentals, setBorrowedRentals] = useState([]);
  const [givenRentals, setGivenRentals] = useState([]);
  const [borrowerCurrentPage, setBorrowerCurrentPage] = useState(1);
  const [ownerCurrentPage, setOwnerCurrentPage] = useState(1);
  const [borrowerTotalPages, setBorrowerTotalPages] = useState(1);
  const [ownerTotalPages, setOwnerTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");
  const isOwner = localStorage.getItem("isVehicleOwner") === "true";

  useEffect(() => {
    fetchBorrowedRentals(borrowerCurrentPage);
    if (isOwner) {
      fetchGivenRentals(ownerCurrentPage);
    }
  }, [borrowerCurrentPage, ownerCurrentPage]);

  const fetchBorrowedRentals = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/vehiclerental/borrower/${username}?page=${page - 1}`
      );
      setBorrowedRentals(response.data.data);
      setBorrowerTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching borrowed rentals:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGivenRentals = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/vehiclerental/owner/${username}?page=${page - 1}`
      );
      console.log(response.data.data);
      setGivenRentals(response.data.data);
      setOwnerTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching given rentals:", error);
    } finally {
      setLoading(false);
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

  const renderRentalsTable = (rentals, isGiven = false) => (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Vehicle
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              {isGiven ? "Borrower" : "Owner"}
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Price/Day
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Start Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              End Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rentals.map((rental) => (
            <tr key={rental.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm">{rental.vehicle?.vehicleType}</td>
              <td className="px-4 py-2 text-sm">
                {isGiven ? rental.borrower?.username : rental.vehicle?.owner?.username}
              </td>
              <td className="px-4 py-2 text-sm">₹{rental.vehicle?.price}</td>
              <td className="px-4 py-2 text-sm">
                {formatDate(rental.beginDate)}
              </td>
              <td className="px-4 py-2 text-sm">
                {formatDate(rental.finishDate)}
              </td>
            </tr>
          ))}
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
        {/* Rentals Taken */}
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
          Rentals Taken
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : borrowedRentals.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              You have not rented any vehicles.
            </h3>
          </div>
        ) : (
          <>
            {renderRentalsTable(borrowedRentals, false)}
            <Pagination
              currentPage={borrowerCurrentPage}
              totalPages={borrowerTotalPages}
              onPrev={() => setBorrowerCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() =>
                setBorrowerCurrentPage((p) =>
                  p < borrowerTotalPages ? p + 1 : p
                )
              }
              setPage={setBorrowerCurrentPage}
            />
          </>
        )}

        {/* Rentals Given */}
        {isOwner && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mt-10 mb-4">
              Rentals Given
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : givenRentals.length === 0 ? (
              <div className="text-center py-12">
                <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  None of your vehicles are rented out currently.
                </h3>
              </div>
            ) : (
              <>
                {renderRentalsTable(givenRentals, true)}
                <Pagination
                  currentPage={ownerCurrentPage}
                  totalPages={ownerTotalPages}
                  onPrev={() => setOwnerCurrentPage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setOwnerCurrentPage((p) =>
                      p < ownerTotalPages ? p + 1 : p
                    )
                  }
                  setPage={setOwnerCurrentPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
