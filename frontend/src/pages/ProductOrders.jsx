import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import axiosInstance from "../api/Api";

export default function ProductOrders() {
  // Buyer state
  const [buyerOrders, setBuyerOrders] = useState([]);
  const [buyerCurrentPage, setBuyerCurrentPage] = useState(1);
  const [buyerTotalPages, setBuyerTotalPages] = useState(1);
  const [buyerLoading, setBuyerLoading] = useState(true);

  // Seller state
  const [sellerOrders, setSellerOrders] = useState([]);
  const [sellerCurrentPage, setSellerCurrentPage] = useState(1);
  const [sellerTotalPages, setSellerTotalPages] = useState(1);
  const [sellerLoading, setSellerLoading] = useState(true);

  const username = localStorage.getItem("username");
  const isFarmer = localStorage.getItem("isFarmer") === "true";

  useEffect(() => {
    fetchBuyerOrders(buyerCurrentPage);
  }, [buyerCurrentPage]);

  useEffect(() => {
    if (isFarmer) fetchSellerOrders(sellerCurrentPage);
  }, [sellerCurrentPage, isFarmer]);

  const fetchBuyerOrders = async (page) => {
    try {
      setBuyerLoading(true);
      const response = await axiosInstance.get(
        `/productorders/buyer/${username}?page=${page - 1}`
      );
      setBuyerOrders(response.data.data);
      setBuyerTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching buyer product orders:", error);
    } finally {
      setBuyerLoading(false);
    }
  };

  const fetchSellerOrders = async (page) => {
    try {
      setSellerLoading(true);
      const response = await axiosInstance.get(
        `/productorders/seller/${username}?page=${page - 1}`
      );
      setSellerOrders(response.data.data);
      setSellerTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching seller product orders:", error);
    } finally {
      setSellerLoading(false);
    }
  };

  const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
      >
        <FaChevronLeft />
      </button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
      >
        <FaChevronRight />
      </button>
    </div>
  );

  const renderOrdersTable = (orders, isSellerTable = false) => (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Product</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              {isSellerTable ? "Buyer" : "Seller"}
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Quantity</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Order Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm">{order.product?.name}</td>
              <td className="px-4 py-2 text-sm">
                {isSellerTable ? order.buyer?.username : order.seller?.username}
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Buyer Orders */}
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
          My Product Orders
        </h2>
        {buyerLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : buyerOrders.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              You have not bought any product
            </h3>
            <p className="mt-1 text-gray-500">You haven’t placed any orders yet.</p>
          </div>
        ) : (
          <>
            {renderOrdersTable(buyerOrders, false)}
            <Pagination
              currentPage={buyerCurrentPage}
              totalPages={buyerTotalPages}
              onPrev={() => setBuyerCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() =>
                setBuyerCurrentPage((p) => (p < buyerTotalPages ? p + 1 : p))
              }
            />
          </>
        )}

        {isFarmer && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mt-10 mb-4">
              Product Orders Received
            </h2>
            {sellerLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : sellerOrders.length === 0 ? (
              <div className="text-center py-12">
                <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  You haven't sold any products
                </h3>
                <p className="mt-1 text-gray-500">You haven’t received any orders yet.</p>
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
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
