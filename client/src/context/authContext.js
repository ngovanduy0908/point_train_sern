import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import dotenv from 'dotenv';
// dotenv.config();

// const apiUrl = process.env.API_URL;
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [maHKAdmin, setMaHKAdmin] = useState(null);
  const handleSetMaHKAdmin = (value) => {
    setMaHKAdmin(value);
  };

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
    return res.data;
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, maHKAdmin, handleSetMaHKAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
