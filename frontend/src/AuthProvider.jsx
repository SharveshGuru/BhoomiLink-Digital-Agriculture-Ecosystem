import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
        setLoading(false); 
    }, []);

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
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
