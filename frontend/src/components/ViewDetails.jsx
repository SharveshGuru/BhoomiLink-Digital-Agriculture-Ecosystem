// src/components/ViewDetail.jsx
import React from 'react';

const ViewDetail = ({ vehicle, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-green-800 mb-4">{vehicle.vehicleType}</h3>
      
      <div className="flex flex-col items-center">
        <div className="h-48 w-full bg-gray-100 flex items-center justify-center mb-4">
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

        <p className="text-sm text-gray-700"><strong>Price:</strong> ₹{vehicle.price.toFixed(2)}</p>
        <p className="text-sm text-gray-700"><strong>Capacity:</strong> {vehicle.capacity} people</p>
        <p className="text-sm text-gray-700"><strong>Status:</strong> Available</p>
        <p className="text-sm text-gray-700"><strong>Description:</strong> {vehicle.description || 'No description available'}</p>
        
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Rent
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
