import { useState } from "react";
import axiosInstance from "../api/Api";

const OrderRawMaterial = ({ product, onClose, onOrderPlaced }) => {
  const [quantity, setQuantity] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const buyerUsername = localStorage.getItem("username");

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setQuantity(value);
      if (value === "" || Number(value) <= 0) {
        setError("Quantity must be greater than 0");
      } else if (Number(value) > product.quantity) {
        setError(`Max available quantity is ${product.quantity}`);
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qty = Number(quantity);

    if (qty <= 0 || isNaN(qty)) {
      setError("Quantity must be greater than 0");
      return;
    }
    if (qty > product.quantity) {
      setError(`Max available quantity is ${product.quantity}`);
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        quantity: qty,
        buyer: { username: buyerUsername },
        seller: { username: product.owner.username },
        rawMaterials: { id: product.id }
      };

      await axiosInstance.post("/rawmaterialsorders", orderData);

      onOrderPlaced();
      setIsSuccess(true); // show success message
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  const totalPrice =
    quantity && !isNaN(Number(quantity))
      ? Number(quantity) * product.price
      : 0;

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Order {product.name}
        </h2>

        {isSuccess ? (
          <div className="text-center">
            <p className="text-green-700 font-semibold mb-4">
              Order placed successfully!
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm text-white bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="text-sm text-gray-600">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-600">
                  Price: ₹{product.price} / unit
                </p>
                <p className="text-sm text-gray-600">
                  Seller: {product.owner.username}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                <p className="text-xs text-gray-500">
                  Available: {product.quantity}
                </p>
                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>

              <div className="text-sm font-semibold text-gray-800">
                Total Price: ₹{totalPrice}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-emerald-600 rounded-md text-sm text-gray-700 bg-white hover:bg-emerald-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || error !== ""}
                  className="px-4 py-2 rounded-md text-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Placing..." : "Place Order"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderRawMaterial;
