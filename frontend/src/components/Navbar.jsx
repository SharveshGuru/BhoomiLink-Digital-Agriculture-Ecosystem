import { useContext, useState } from "react";
import { FaGlobeAmericas, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center px-6 py-2 shadow-md bg-emerald-800 w-full">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaGlobeAmericas size={32} className="text-white" />
          <h1 className="text-2xl font-bold text-white">BhoomiLink</h1>
        </Link>

        {isLoggedIn && (
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}
      </div>

      {isLoggedIn && (
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pb-4 md:pb-0`}
        >
          <Link
            to="/rawmaterials"
            className="flex items-center gap-1 text-white hover:text-emerald-200 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Raw Materials</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-1 text-white hover:text-emerald-200 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer w-full md:w-auto text-center"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}