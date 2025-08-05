import { useState } from "react";
import { MdOutlineLanguage } from "react-icons/md";
import { FaGlobeAmericas } from "react-icons/fa";

export default function Navbar() {
  const [lang, setLang] = useState("English");

  return (
    <header className="flex justify-between items-center px-6 py-2 shadow-md bg-emerald-800">
      <div className="flex items-center gap-2">
        <FaGlobeAmericas size={32} className="text-white" />
        <h1 className="text-2xl font-bold text-white">BhoomiLink</h1>
      </div>

      <div className="flex items-center gap-4">
        <MdOutlineLanguage size={24} className="text-white" />
        <select
          className="border rounded px-2 py-1 text-sm text-gray-800 bg-white border-emerald-300 hover:border-emerald-600 focus:outline-none focus:border-emerald-600"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option>English</option>
          <option>தமிழ்</option>
          <option>हिंदी</option>
          <option>తెలుగు</option>
        </select>
      </div>
    </header>
  );
}
