import React from "react";
import FeatureCard from "../components/FeatureCard";
import { FaTractor, FaSeedling, FaUserFriends, FaShoppingBasket } from "react-icons/fa";
export default function Dashboard(){
    return(
    <div>
    <section className="bg-white py-12 px-6">
        <h3 className="text-3xl font-bold text-center text-green-700 mb-10">Welcome to BhoomiLink!</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <FeatureCard icon={<FaShoppingBasket size={28} />} title="Direct Market" desc="Sell your produce directly to buyers, cutting out middlemen." />         
        {localStorage.getItem('isFarmer') === 'true'? <FeatureCard icon={<FaTractor size={28} />} title="Equipment Rental" desc="Rent tractors and farming tools on demand." />:<></>}
        {localStorage.getItem('isFarmer') === 'true'? <FeatureCard icon={<FaUserFriends size={28} />} title="Hire Workers" desc="Connect with local agricultural laborers easily." />:<></>}          
        {/* {localStorage.getItem('isFarmer') === 'true'? <FeatureCard icon={<FaSeedling size={28} />} title="Crop Guidance" desc="Receive expert advice and weather-based suggestions." />:<></>} */}
        {localStorage.getItem('isFarmer') === 'true'? <FeatureCard icon={<FaShoppingBasket size={28} />} title="Shop Agro Products" desc="Buy Agro products from the shops." />:<></>}
        {localStorage.getItem('isMerchant') === 'true'? <FeatureCard icon={<FaShoppingBasket size={28} />} title="My Products" desc="Sell Agro products to farmers." />:<></>}
        {localStorage.getItem('isVehicleOwner') === 'true'? <FeatureCard icon={<FaTractor size={28} />} title="My Vehicles" desc="Rent tractors and farming tools on request." />:<></>}
        {localStorage.getItem('isWorker') === 'true'? <FeatureCard icon={<FaUserFriends size={28} />} title="My Works" desc="Connect with local agricultural works." />:<></>}

        </div>
    </section>
    </div>
    );
}