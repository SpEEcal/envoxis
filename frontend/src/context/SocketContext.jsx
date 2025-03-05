import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext() // allows components to provide or read from the context

export const useSocketContext = () => {
    return useContext(SocketContext) // returns context value
}

export const SocketContextProvider = ({children}) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {authUser} = useAuthContext() // gets the current signed in user

    useEffect(() => {
        if(authUser){
            const socket = io("https://envoxis.onrender.com", {
                query:{
                    userId: authUser._id, // gets the user id of users currently online on website
                }
            })

            setSocket(socket)

            socket.on("getOnlineUsers", (users) => { // gets users online and sets them in an array
                setOnlineUsers(users)
            })

            return () => socket.close() // refresh function
        } else {
            if(socket){ // checks if there is a socket
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])

    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider> /* returns the user model objects of the current users logged into the website*/
}