import { useNavigate } from "react-router-dom";
import { FaTractor, FaSeedling, FaUserFriends, FaShoppingBasket } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import homepage from '../assets/homepage.svg';
import image from '../assets/image.png';
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800">

      <section className="grid lg:grid-cols-2 px-6 py-12 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4 leading-tight text-green-800">
            Empowering Farmers, Connecting Communities
          </h2>
          <p className="text-lg mb-6 max-w-xl">
            Sell produce directly, hire workers, rent farming equipment, and get expert guidance — all in one trusted platform.
          </p>
          {localStorage.getItem('isLoggedIn') === 'true' ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Go To Dashboard
            </button>
          ) : (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigate("/register")}
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FaUserFriends />
                Register
              </button>

              <button
                onClick={() => navigate("/login")}
                className="border border-green-600 text-green-700 hover:bg-green-100 text-lg px-6 py-2 rounded-xl shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FaShoppingBasket />
                Login
              </button>
            </div>
          )}
        </div>
        <img
          src={image}
          alt="Farmer using app"
          className="w-full max-h-[400px] object-contain"
        />
      </section>

      {/* <section className="bg-white py-12 px-6">
        <h3 className="text-3xl font-bold text-center text-green-700 mb-10">Platform Highlights</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <FeatureCard icon={<FaShoppingBasket size={28} />} title="Direct Market" desc="Sell your produce directly to buyers, cutting out middlemen." />
          <FeatureCard icon={<FaTractor size={28} />} title="Equipment Rental" desc="Rent tractors and farming tools on demand." />
          <FeatureCard icon={<FaUserFriends size={28} />} title="Hire Workers" desc="Connect with local agricultural laborers easily." />
          <FeatureCard icon={<FaSeedling size={28} />} title="Crop Guidance" desc="Receive expert advice and weather-based suggestions." />
        </div>
      </section> */}

      <section className="py-12 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            Built for Farmers. Trusted by Communities.
          </h3>
          <p className="mb-6">
            Our platform offers chat-based bargaining, Pay Later options, regional languages, and verified reviews to ensure confidence and ease of use.
          </p>
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <IoChatbubblesOutline size={24} /> <span>Chat Bargaining</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserFriends size={24} /> <span>Trusted Reviews</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
