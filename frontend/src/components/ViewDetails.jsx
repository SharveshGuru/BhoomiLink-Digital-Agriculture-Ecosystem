import React from 'react';

const ViewDetail = ({ vehicle, onClose }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
        {vehicle.vehicleType}
      </h3>

      {/* Responsive layout: stack on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Image Section */}
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden">
          {vehicle.image ? (
            <img
              src={`data:image/jpeg;base64,${vehicle.image}`}
              alt={vehicle.vehicleType}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-gray-400">No Image Available</div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-3">
            <p className="text-base text-gray-800"><strong>Price:</strong> ₹{vehicle.price.toFixed(2)}</p>
            <p className="text-base text-gray-800"><strong>Status:</strong> Available</p>
            <p className="text-base text-gray-800 leading-relaxed">
              <strong>Description:</strong> {vehicle.description || 'No description available'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-emerald-600 rounded-md text-sm text-gray-700 bg-white hover:bg-emerald-200 transition cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-md transition cursor-pointer"
            >
              Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
