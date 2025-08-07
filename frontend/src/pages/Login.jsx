import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { loginUser } from "../api/authApi";
import axiosInstance from "../api/Api";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(""); // clear previous errors

      const response = await loginUser({ username, password });
    
      
      if (response === "Invalid Credentials") {
        setErrorMessage("Invalid username or password.");
        return;
      }

      localStorage.setItem("token", response);
      localStorage.setItem("username", username);

      const userDetails = await axiosInstance.get(`/user/${username}`).then((response)=>{
        localStorage.setItem("isFarmer", response.data.isFarmer);
        localStorage.setItem("isMerchant", response.data.isMerchant);
        localStorage.setItem("isWorker", response.data.isWorker);
        localStorage.setItem("isVehicleOwner", response.data.isVehicleOwner);
        // console.log(localStorage.isFarmer);
      })
      .catch((error)=>console.log(error));

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-emerald-50">
      <div className="flex items-center gap-2 mb-8">
        <FaGlobeAmericas size={36} className="text-emerald-600" />
        <h1 className="text-3xl font-bold text-emerald-700">BhoomiLink</h1>
      </div>

      <form
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h2 className="mb-6 text-xl font-semibold text-emerald-700">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 px-2 text-sm text-gray-600 hover:text-black focus:outline-none cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {errorMessage && (
          <p className="mb-4 text-red-600 text-sm font-medium">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded transition cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <div className="mt-5 text-center text-sm">
          Don&apos;t have an account?
          <a
            href="/register"
            className="ml-1 text-emerald-700 hover:underline font-medium"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
