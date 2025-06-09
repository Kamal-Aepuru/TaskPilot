import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    () => JSON.parse(localStorage.getItem("user") || "null")
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = async (username: string, password: string) => {
    const res = await axios.post("http://localhost:3030/api/auth/login", {
      username,
      password,
    }, { withCredentials: true });

    setUser({ username: res.data.username });
  };

  const register = async (username: string, password: string) => {
    const res = await axios.post("http://localhost:3030/api/auth/register", {
      username,
      password,
    }, { withCredentials: true });

    setUser({ username: res.data.username });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    axios.post("http://localhost:3030/api/auth/logout", {}, { withCredentials: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
