import { useState } from "react";
import { FaGlobeAmericas } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login with:\nEmail: ${email}\nPassword: ${password}`);
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
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded transition cursor-pointer"
        >
          Login
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
