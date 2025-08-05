import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [isVehicleOwner, setIsVehicleOwner] = useState(false);
  const [isFarmer, setIsFarmer] = useState(false);
  const [isWorker, setIsWorker] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Register with:
        Name: ${name}
        Email: ${email}
        Phone: ${phonenumber}
        Address: ${address}
        Vehicle Owner: ${isVehicleOwner}
        Farmer: ${isFarmer}
        Worker: ${isWorker}
        Merchant: ${isMerchant}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-emerald-50">
      <form
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md"
        onSubmit={handleRegister}
      >
        <h2 className="mb-6 text-xl font-semibold text-emerald-700">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Address</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={3}
          />
        </div>

        <div className="mb-6">
          <span className="block text-gray-700 mb-1 font-semibold">Roles (optional)</span>

          <label className="inline-flex items-center mr-6">
            <input
              type="checkbox"
              checked={isVehicleOwner}
              onChange={(e) => setIsVehicleOwner(e.target.checked)}
              className="form-checkbox text-emerald-600"
            />
            <span className="ml-2">Vehicle Owner</span>
          </label>

          <label className="inline-flex items-center mr-6">
            <input
              type="checkbox"
              checked={isFarmer}
              onChange={(e) => setIsFarmer(e.target.checked)}
              className="form-checkbox text-emerald-600"
            />
            <span className="ml-2">Farmer</span>
          </label>

          <label className="inline-flex items-center mr-6">
            <input
              type="checkbox"
              checked={isWorker}
              onChange={(e) => setIsWorker(e.target.checked)}
              className="form-checkbox text-emerald-600"
            />
            <span className="ml-2">Worker</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isMerchant}
              onChange={(e) => setIsMerchant(e.target.checked)}
              className="form-checkbox text-emerald-600"
            />
            <span className="ml-2">Merchant</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded transition cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}
