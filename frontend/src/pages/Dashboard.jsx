import FeatureCard from "../components/FeatureCard";
import { FaTractor, FaShoppingBasket, FaUser} from "react-icons/fa";
import { GiFarmer } from 'react-icons/gi';
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate=useNavigate();
    return(
        <div>
            <section className="py-12 px-6">
                <h3 className="text-3xl font-bold text-center text-green-700 mb-10">Welcome to BhoomiLink!</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    <div onClick={() => navigate("/marketplace")} className="cursor-pointer"><FeatureCard icon={<FaShoppingBasket size={28} />} title="Marketplace" desc="Buy and Sell produce directly to buyers, cutting out middlemen." /></div>         
                    {localStorage.getItem('isFarmer') === 'true' || localStorage.getItem('isVehicleOwner') === 'true'? <div onClick={() => navigate("/equipments")} className="cursor-pointer"><FeatureCard icon={<FaTractor size={28} />} title="Equipment Rental" desc="Rent tractors and farming tools on demand." /></div>:<></>}
                    {localStorage.getItem('isFarmer') === 'true'? <div onClick={() => navigate("/hiring")} className="cursor-pointer"><FeatureCard icon={<GiFarmer size={28} />} title="Workforce Hiring" desc="Connect with local agricultural labourers easily." /></div>:<></>}          
                    {/* {localStorage.getItem('isFarmer') === 'true'? <FeatureCard icon={<FaSeedling size={28} />} title="Crop Guidance" desc="Receive expert advice and weather-based suggestions." />:<></>} */}
                    {localStorage.getItem('isFarmer') === 'true'? <div onClick={() => navigate("/rawmaterials")} className="cursor-pointer"><FeatureCard icon={<FaShoppingBasket size={28} />} title="Raw Materials" desc="Buy and Sell Raw Materials from the shops." /></div>:<></>}
                    <div onClick={() => navigate("/profile")} className="cursor-pointer"><FeatureCard icon={<FaUser size={28} />} title="Profile" desc="View and update your profile." /></div>         
                </div>
            </section>
        </div>
    );
}