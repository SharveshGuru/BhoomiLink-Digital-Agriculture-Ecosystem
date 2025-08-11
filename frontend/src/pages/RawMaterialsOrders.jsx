import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axiosInstance from "../api/Api";

export default function RawMaterialsOrders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");
  const isMerchant = localStorage.getItem("isMerchant") === "true";

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
    try {
      setLoading(true);
      const endpoint = isMerchant
        ? `/rawmaterialsorders/seller/${username}?page=${page - 1}`
        : `/rawmaterialsorders/buyer/${username}?page=${page - 1}`;
      const response = await axiosInstance.get(endpoint);
      setOrders(response.data.data);
      setTotalPages(response.data.total);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">
          {isMerchant ? "Orders Received" : "My Orders"}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Product</th>
                  {isMerchant ? (
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
                    {isMerchant ? (
                      <td className="px-4 py-2 text-sm">{order.buyer?.username}</td>
                    ) : (
                      <td className="px-4 py-2 text-sm">{order.seller?.username}</td>
                    )}
                    <td className="px-4 py-2 text-sm">₹{order.price}</td>
                    <td className="px-4 py-2 text-sm">{order.quantity}</td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(order.orderDate).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FaChevronLeft />
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
