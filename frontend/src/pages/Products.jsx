import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaImage } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import axiosInstance from "../api/Api";
import Popup from "../components/Popup";
import AddProduct from "../components/AddProduct";
import { useNavigate } from "react-router-dom";
import OrderProduct from "../components/OrderProduct";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, shouldRefresh]);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/products/available?page=${page - 1}`);
      const data = response.data;
      setProducts(data.data);
      setTotalPages(data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
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

  const handleOrder = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center sm:text-left w-full sm:w-auto">
            Products Marketplace
          </h2>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            {localStorage.getItem("isFarmer") === "true" && (
              <>
                <button
                  onClick={handlePopupToggle}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer text-sm sm:text-base"
                >
                  Add New Product
                </button>
                <button
                  onClick={() => navigate("/marketplace/manage")}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer text-sm sm:text-base"
                >
                  Manage
                </button>
              </>
            )}

            <button
              onClick={() => navigate("/product/orders")}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer text-sm sm:text-base"
            >
              View Orders
            </button>
          </div>
        </div>

        {/* Loading / Empty / Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products available</h3>
            <p className="mt-1 text-gray-500">Check back later or add new products if you're a supplier.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-40 sm:h-48 bg-gray-100 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={`data:image/jpeg;base64,${product.image}`}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaImage className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400" />
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-xs sm:text-sm font-medium">₹{product.price.toFixed(2)}/unit</span>
                      <span
                        className={`text-xs sm:text-sm px-2 py-1 rounded-full ${
                          product.quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.quantity > 0 ? `${product.quantity} available` : "Out of stock"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOrder(product)}
                      disabled={product.quantity <= 0}
                      className={`w-full py-1.5 sm:py-2 rounded-lg text-sm sm:text-base ${
                        product.quantity > 0
                          ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {product.quantity > 0 ? "Order Now" : "Out of Stock"}
                    </button>
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
                  className={`relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs sm:text-sm font-medium rounded-md ${
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
                  className={`ml-3 relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs sm:text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{totalPages}</span>
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevious}
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
          </>
        )}
      </div>

      {/* Add Product Popup */}
      <Popup isOpen={isPopupOpen} onClose={handlePopupToggle}>
        <AddProduct
          onAdd={() => {
            setShouldRefresh((prev) => !prev);
            setIsPopupOpen(false);
          }}
          onCancel={handlePopupToggle}
        />
      </Popup>

      {/* Order Product Popup */}
      <Popup
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        <OrderProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOrderPlaced={() => {
            fetchProducts(currentPage);
          }}
        />
      </Popup>
    </div>
  );
}
