import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBasket, FaChevronLeft, FaChevronRight, FaImage } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import axiosInstance from "../api/Api";

export default function RawMaterials() {
  const navigate = useNavigate();
  const [rawMaterials, setRawMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRawMaterials(currentPage);
  }, [currentPage]);


const fetchRawMaterials = async (page) => {
    try {
        setLoading(true);

        const response = await axiosInstance.get(`/rawmaterials/available?page=${page - 1}`);

        const data = response.data;
        setRawMaterials(data.data);
        setTotalPages(data.total);

    } catch (error) {
        console.error("Error fetching raw materials:", error);
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

  const handleOrder = (materialId) => {
    console.log(`Order placed for material ID: ${materialId}`);
    alert("Order functionality will be implemented soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-800">Raw Materials Marketplace</h2>
          {localStorage.getItem('isMerchant') === 'true' && (
            <button
              onClick={() => navigate("/rawmaterials/add")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            >
              Add New Material
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : rawMaterials.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No raw materials available</h3>
            <p className="mt-1 text-gray-500">Check back later or add new materials if you're a supplier.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rawMaterials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    {material.image ? (
                      <img
                        src={`data:image/jpeg;base64,${material.image}`}
                        alt={material.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaImage className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-1">{material.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Category: {material.category}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">₹{material.price.toFixed(2)}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${material.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {material.quantity > 0 ? `${material.quantity} available` : 'Out of stock'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOrder(material.id)}
                      disabled={material.quantity <= 0}
                      className={`w-full py-2 rounded-lg ${material.quantity > 0 ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      {material.quantity > 0 ? 'Order Now' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8 px-4 py-3 bg-white rounded-lg shadow-sm">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
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
                        className={`relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium ${currentPage === pageNum ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
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