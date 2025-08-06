import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");

  const [isVehicleOwner, setIsVehicleOwner] = useState(false);
  const [isFarmer, setIsFarmer] = useState(false);
  const [isWorker, setIsWorker] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      name,
      username,
      password,
      email,
      phonenumber,
      address,
      userType: "User",
      isVehicleOwner,
      isFarmer,
      isWorker,
      isMerchant,
    };

    try {
      setIsSubmitting(true);
      await registerUser(userData);
      alert("Registration successful!");
      setName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setPhonenumber("");
      setAddress("");
      setIsVehicleOwner(false);
      setIsFarmer(false);
      setIsWorker(false);
      setIsMerchant(false);
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error?.response?.data?.message ||
        "Registration failed. Please check inputs or try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 px-1 text-sm text-gray-600 focus:outline-none cursor-pointer hover:text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <span className="block text-gray-700 mb-1 font-semibold">Roles (optional)</span>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={isVehicleOwner}
              onChange={(e) => setIsVehicleOwner(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Vehicle Owner</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={isFarmer}
              onChange={(e) => setIsFarmer(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Farmer</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={isWorker}
              onChange={(e) => setIsWorker(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Worker</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isMerchant}
              onChange={(e) => setIsMerchant(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Merchant</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white font-semibold py-2 rounded transition cursor-pointer ${
            isSubmitting
              ? "bg-emerald-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
