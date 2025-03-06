// library or external function to be used in program
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogin = () => {
    const [loading2, setLoading] = useState(false) // checks loading state of function
    const {setAuthUser} = useAuthContext() // loads the user information to show on website

    const login = async(username, password) => {
        const success = handleInputErrors(username, password) // checks whether any of the inputted data is not in the corrct format or data type
        if(!success) return // stops login process if error has occurred

        setLoading(true) // shows that function is being used
        try {
            const res = await fetch("/api/auth/login", {
                // defining method in case of duplicate api path
                method: "POST",
                // gives the server information about the request
                headers: {
                    "Content-Type": "application/json",
                    'Accept':'application/json'
                },
                
                body: JSON.stringify({ username, password }) // sends data to backend to use to find the user in the MongoDB database
            })

            // captures the output from the backend in format of string
            const data = await res.json()
            // checks for errors
            if(data.error){
                throw new Error(data.error)
            }

            // local storage
            localStorage.setItem("chat-user", JSON.stringify(data))
            // context
            setAuthUser(data)

        //error catching
        } catch (error) {
            //displays error
            toast.error(error.message)
        } finally {
            setLoading(false) // function has finished running
        }
    }
    return { loading2, login }
}

export default useLogin

function handleInputErrors(username, password){
    if(!username || !password) { // checks if input boxes have data in them
        toast.error('Please fill in all the fields')
        return false
    }

    return true
}