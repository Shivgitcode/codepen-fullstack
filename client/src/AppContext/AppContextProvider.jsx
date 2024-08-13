import { useState } from "react";
import { createContext } from "react";


export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const value = {
        isLoggedIn,
        setIsLoggedIn
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}