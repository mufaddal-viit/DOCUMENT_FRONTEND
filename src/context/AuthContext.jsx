import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setToken, getToken } from "../lib/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //set token in localStorage
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // console.log(decoded);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            id: decoded.id,
            role: decoded.role,
            name: decoded.name,
            email: decoded.email,
          });
        } else {
          setToken(null);
        }
      } catch (error) {
        // console.error("Invalid token:", error);
        setToken(null);
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      //token sent by the server in response.
      const data = await response.json();
      if (data.token) {
        setToken(data.token); //token stored in localStorage
        const decoded = jwtDecode(data.token); // Decode token to get user details
        setUser({ id: decoded.id, role: decoded.role });
        navigate(
          decoded.role === "UPLOADER"
            ? "/dashboard/uploader"
            : "/dashboard/signer"
        );
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
