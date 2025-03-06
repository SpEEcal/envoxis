import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false) // checks loading state of function
    const [conversations, setConversation] = useState([]) // gets the conversations and stores in array

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true) // shows that function is being used

            try {
                // res captures the return from the backend
                // fetch is used to run a backend function to perform the action of getting the messages from the conversation
                const res = await fetch('/api/users')
                const data = await res.json() // captures the output from the backend in format of string

                if(data.error){ // checks for errors
                    throw new Error(data.error)
                }

                setConversation(data) // sets conversations as data array
            // checks for errors
            } catch (error) {
                toast.error(error.message) // displays error
            } finally {
                setLoading(false) // function has finished running
            }
        }

        getConversations() // runs the function
    },[])

    return { loading, conversations } // returns the conversation array and loading state
}

export default useGetConversations