import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Force dark mode permanently
  const [theme] = useState("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    // Always add dark class
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // Keep toggleTheme for compatibility but it does nothing
  const toggleTheme = () => {
    // Disabled - always dark mode
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
