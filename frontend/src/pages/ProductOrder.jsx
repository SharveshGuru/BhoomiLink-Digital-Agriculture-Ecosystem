import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import axiosInstance from "../api/Api";

export default function ProductOrder() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");
  const isFarmer = localStorage.getItem("isFarmer") === "true";

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
    try {
      setLoading(true);
      const endpoint = isFarmer
        ? `/productorders/seller/${username}?page=${page - 1}`
        : `/productorders/buyer/${username}?page=${page - 1}`;
    // const endpoint = `/productorders/buyer/${username}?page=${page - 1}`;
      const response = await axiosInstance.get(endpoint);

      setOrders(response.data.data);
      setTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching product orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800">
            {isFarmer ? "Product Orders Received" : "My Product Orders"}
          </h2>
        </div>

        {/* Loading / Empty */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-gray-500">
              {isFarmer ? "You haven’t received any orders yet." : "You haven’t placed any orders yet."}
            </p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Product</th>
                    {isFarmer ? (
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Buyer</th>
                    ) : (
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Seller</th>
                    )}
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Quantity</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Order Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm">{order.product?.name}</td>
                      {isFarmer ? (
                        <td className="px-4 py-2 text-sm">{order.buyer?.username}</td>
                      ) : (
                        <td className="px-4 py-2 text-sm">{order.seller?.username}</td>
                      )}
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

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
