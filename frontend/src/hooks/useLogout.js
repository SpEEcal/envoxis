// library or external function to be used in program
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogout = () => {
    const [ loading, setLoading ] = useState(false) // checks loading state of function
    const {setAuthUser} = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/logout",{
                // defining method in case of duplicate api path
                method: "POST",
                // gives the server information about the request
                headers: {"Content-Type": "application/json"}
            })
            // captures the output from the backend in format of string
            const data = await res.json()
            // checks for errors
            if(data.error){
                throw new Error(data.error)
            }

            // local storage
            localStorage.removeItem("chat-user")
            // context
            setAuthUser(null)
        // checks for errors
        } catch (error) {
            toast.error(error.message) // displays errors
        } finally {
            setLoading(false) // function has finished running
        }
    }

    return {loading, logout}
}

export default useLogout