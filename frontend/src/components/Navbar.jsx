import { useContext } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-6 py-2 shadow-md bg-emerald-800">
      <Link
        to={isLoggedIn ? "/dashboard" : "/"}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaGlobeAmericas size={32} className="text-white" />
        <h1 className="text-2xl font-bold text-white">BhoomiLink</h1>
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-1 text-white hover:text-emerald-200 transition"
            >
              <span>Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
