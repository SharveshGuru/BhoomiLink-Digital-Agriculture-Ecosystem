import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider=({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        setIsLoggedIn(localStorage.getItem("isLoggedIn")==="true");
    },[]);

    const login = () => {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("isFarmer");
        localStorage.removeItem("isMerchant");
        localStorage.removeItem("isWorker");
        localStorage.removeItem("isVehicleOwner");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}