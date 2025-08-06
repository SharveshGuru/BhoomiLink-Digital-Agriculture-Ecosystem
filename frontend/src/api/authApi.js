import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/user`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response || error);
    throw error;
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data; 
  } catch (error) {
    console.error("Login failed:", error.response || error);
    throw error;
  }
};
