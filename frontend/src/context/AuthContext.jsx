import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Kita panggil /me.php tanpa cek token di localStorage
      // Karena browser akan otomatis kirim cookie HttpOnly
      try {
        const response = await api.get("/me.php");
        if (response.data.status) {
          const userData = response.data.data.user;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          logout();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post("/login.php", { username, password });

      if (response.data.status) {
        const { user } = response.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Login Error", error);
      return { success: false, message: "Terjadi kesalahan server" };
    }
  };

  const register = async (username, password) => {
    try {
      const response = await api.post("/register.php", { username, password });

      if (response.data.status) {
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Register Error", error);
      return { success: false, message: "Terjadi kesalahan server" };
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout.php");
    } catch (error) {
      console.error("Logout error", error);
    }
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
