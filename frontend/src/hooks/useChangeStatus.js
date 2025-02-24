// library or external function to be used in program
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useChangeStatus = () => {
    // gets useState function in file
    const {setAuthUser} = useAuthContext()

    const newstatus = async (status) => {
        try {
            // res captures the return from the backend
            // fetch is used to run a backend function to perform the action of updating the status of a user
            const res = await fetch("/api/auth/changestatus", {
                // defining method in case of duplicate api path
                method: "POST",
                // gives the server information about the request
                headers: {"Content-Type": "application/json"},
                // gives backend information to change the status to
                body: JSON.stringify({status})
            })
            // captures the output from the backend in format of string
            const data = await res.json()
            // checks for errors
            if (data.error){
                throw new Error(data.error)
            }

            // updates the users information
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
        //error catching
        } catch (error) {
            //displays error
            toast.error(error.message)
        }
    }

    return {newstatus}
}

export default useChangeStatus