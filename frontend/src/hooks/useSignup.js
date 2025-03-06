// library or external function to be used in program
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useSignup = () => {
    const [loading, setLoading] = useState(false) // checks loading state of function
    const {setAuthUser} = useAuthContext() // loads the user information to show on website
    
    // function used to sign up user
    const signup = async({username, email, phonenumber, password,confirmPassword}) => {
        const success = handleInputErrors({username, email, phonenumber, password, confirmPassword}) // checks whether any of the inputted data is not in the correct format or data type
        if(!success) return // stops sign in process if error has occurred

        setLoading(true); // shows that function is being used
        try {
            // res captures the return from the backend
            // fetch is used to run a backend function to perform the action of getting the messages from the conversation
            const res = await fetch("/api/auth/signup", {
                // defining method in case of duplicate api path
                method: "POST",
                // gives the server information about the request
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({username, email, phonenumber, password, confirmPassword}) // sends data to backend to use to store the user into MongoDB
            })

            // captures the output from the backend in format of string
            const data = await res.json() 
            // checks for errors
            if(data.error) {
                throw new Error(data.error)
            }
            // local storage
            localStorage.setItem("chat-user",JSON.stringify(data))
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

    return { loading, signup} 
}

export default useSignup


function handleInputErrors({username, email, phonenumber, password, confirmPassword}){
    if(!username || !email || !phonenumber || !password || !confirmPassword) { // checks if input boxes have data in them
        toast.error('Please fill in all the fields')
        return false
    }
    // checks if password has been inputted correctly
    if(password !== confirmPassword){
        toast.error('Passwords do not match')
        return false
    }

    // checks if password is less than the minimum amount
    if(password.length < 8){
        toast.error('Password must be at least 8 characters')
        return false
    }

    return true
}