import { createContext, useContext, useState, useEffect } from "react";
import api from "../api"; // Assuming api is configured already
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   // Function to handle login
   const login = async (username, password) => {
      try {
         // Send login request to the backend
         console.log("Trying to ping backend: /login/ ...")
         const res = await api.post("/login/", { username, password }); // Assume /api/login is your login endpoint
         // Check if the backend response is true (indicating successful login)
         if (res.data.success) { // Assuming the backend response has a "success" field that is true on successful login
            // Fetch user details
            const userRes = await api.get(`/users/${username}/`);

            // Set user data into state
            setUser(userRes.data);
            console.log("Login success. Logged in as user: ", userRes.data);

            // Navigate based on role or to a default route
            navigate(userRes.data.role.id === 3 ? "/" : "/");
         } else {
            // Handle failed login response
            console.error("Login failed:", res.data.message || "Unknown error");
            // Optionally show an error message to the user
         }
      } catch (error) {
         console.error("Login error:", error);
         // Optionally handle errors with a custom error message
      }
   };


   // Function to log out
   const logout = () => {
      setUser(null);
      // You can also navigate to the login page if needed
      // navigate("/login");
   };

   // Auto-login (Check if user data exists)
   useEffect(() => {
      const checkAuth = async () => {
         // Simply check if the user is already logged in based on user state
         if (user) {
            setLoading(false);
         } else {
            setLoading(false);
         }
      };

      checkAuth();
   }, [user]);

   return (
      <AuthContext.Provider value={{ user, login, logout }}>
         {!loading && children}
      </AuthContext.Provider>
   );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
