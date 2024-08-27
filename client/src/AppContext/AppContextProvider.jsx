import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import Cookie from "js-cookie"


export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [jwtToken, setJwtToken] = useState("")

    useEffect(() => {
        setJwtToken(Cookie.get("jwt"))

    }, [isLoggedIn])
    const value = {
        isLoggedIn,
        jwtToken,
        setJwtToken,
        setIsLoggedIn
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}