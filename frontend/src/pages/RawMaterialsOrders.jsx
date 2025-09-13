import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import axiosInstance from "../api/Api";

export default function RawMaterialsOrders() {
  const [buyerOrders, setBuyerOrders] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [buyerCurrentPage, setBuyerCurrentPage] = useState(1);
  const [sellerCurrentPage, setSellerCurrentPage] = useState(1);
  const [buyerTotalPages, setBuyerTotalPages] = useState(1);
  const [sellerTotalPages, setSellerTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");
  const isMerchant = localStorage.getItem("isMerchant") === "true";

  useEffect(() => {
    fetchBuyerOrders(buyerCurrentPage);
    if (isMerchant) {
      fetchSellerOrders(sellerCurrentPage);
    }
  }, [buyerCurrentPage, sellerCurrentPage]);

  const fetchBuyerOrders = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/rawmaterialsorders/buyer/${username}?page=${page - 1}`
      );
      setBuyerOrders(response.data.data);
      setBuyerTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching buyer orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSellerOrders = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/rawmaterialsorders/seller/${username}?page=${page - 1}`
      );
      setSellerOrders(response.data.data);
      setSellerTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching seller orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const Pagination = ({ currentPage, totalPages, onPrev, onNext, setPage }) => (
    <div className="flex items-center justify-between mt-6 sm:mt-8 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg shadow-sm">
      {/* Mobile Pagination */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`ml-3 relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
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

  const renderOrdersTable = (orders, isSellerTable = false) => (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Product
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              {isSellerTable ? "Buyer" : "Seller"}
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Price
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Quantity
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Order Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm">
                {order.rawMaterials?.name}
              </td>
              <td className="px-4 py-2 text-sm">
                {isSellerTable
                  ? order.buyer?.username
                  : order.seller?.username}
              </td>
              <td className="px-4 py-2 text-sm">
                {order.rawMaterials?.category}
              </td>
              <td className="px-4 py-2 text-sm">₹{order.price}</td>
              <td className="px-4 py-2 text-sm">{order.quantity}</td>
              <td className="px-4 py-2 text-sm">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Buyer Orders Table */}
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
          Orders Placed
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : buyerOrders.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              You have not bought anything.
            </h3>
          </div>
        ) : (
          <>
            {renderOrdersTable(buyerOrders, false)}
            <Pagination
              currentPage={buyerCurrentPage}
              totalPages={buyerTotalPages}
              onPrev={() => setBuyerCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() =>
                setBuyerCurrentPage((p) =>
                  p < buyerTotalPages ? p + 1 : p
                )
              }
              setPage={setBuyerCurrentPage}
            />
          </>
        )}

        {/* Seller Orders Table (Only if merchant) */}
        {isMerchant && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mt-10 mb-4">
              Orders Received
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : sellerOrders.length === 0 ? (
              <div className="text-center py-12">
                <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  You have not sold anything
                </h3>
              </div>
            ) : (
              <>
                {renderOrdersTable(sellerOrders, true)}
                <Pagination
                  currentPage={sellerCurrentPage}
                  totalPages={sellerTotalPages}
                  onPrev={() => setSellerCurrentPage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setSellerCurrentPage((p) =>
                      p < sellerTotalPages ? p + 1 : p
                    )
                  }
                  setPage={setSellerCurrentPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
