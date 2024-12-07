import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const fetchUser = async () => {
    const response = await fetch("http://localhost:5000/api/v1/check/me", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const res = await response.json();
      setJwtToken(res.user);
    } else {
      const res = await response.json();
      console.log(res);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [isLoggedIn]);
  const value = {
    isLoggedIn,
    jwtToken,
    setJwtToken,
    setIsLoggedIn,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
