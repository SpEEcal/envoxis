import { createContext, useContext, useState } from "react";

export const AuthContext = createContext() // allows components to provide or read from the context

export const useAuthContext = () => {
    return useContext(AuthContext) // returns context value
}

export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null) // finds user information from local storage an converts it into a string

    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children} {/* returns the user model object of the current user logged in*/}
    </AuthContext.Provider>
}