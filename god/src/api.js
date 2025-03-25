import axios from "axios";

// Define apiUrl directly or retrieve it from a configuration file/object
const apiUrl = "http://localhost:8000/";

const api = axios.create({
   baseURL: apiUrl,
   headers: { "Content-Type": "application/json" },
});

// Function to attach refresh logic (removed as no longer needed)
export const setupInterceptors = () => {
   // No token handling needed anymore, so no request or response interceptors are set up
};

export default api;
