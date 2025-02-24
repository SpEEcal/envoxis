// library or external function to be used in program
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useDeleteUser = () => {
    // gets useState function in file
    const {setAuthUser} = useAuthContext()

    const deleteUser = async () => {
        try {
            // res captures the return from the backend
            // fetch is used to run a backend function to perform the action of deleting a user
            const res = await fetch("/api/auth/deleteuser", {
                // defining method in case of duplicate api path
                method: "POST",
                // gives the server information about the request
                headers: {"Content-Type": "application/json"}
            })
            // captures the output from the backend in format of string
            const data = await res.json()
            // checks for errors
            if (data.error){
                throw new Error(data.error)
            }

            // stops user from accessing the website
            localStorage.removeItem("chat-user")
            setAuthUser(null)
        //error catching
        } catch (error) {
            //displays error
            toast.error(error.message)
        }
    }

    return {deleteUser}
}

export default useDeleteUser