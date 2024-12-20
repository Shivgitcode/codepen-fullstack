import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const fetchUser = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/check/me`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const res = await response.json();
      console.log(res.user);
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
    otpEmail,
    setOtpEmail,
    jwtToken,
    setJwtToken,
    setIsLoggedIn,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
