import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage = () => {
    // checks loading state of function
    const [loading, setLoading] = useState(false)
    // allows for messages to be used in other areas of the program
    const {messages, setMessages, selectedConversation} = useConversation()

    const sendMessage = async (message) => {
        setLoading(true) // shows that function is being used
        try {
            // res captures the return from the backend
            // fetch is used to run a backend function to perform the action of getting the messages from the conversation
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                // defining method in case of duplicate api path
                method: 'POST',
                // gives the server information about the request
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message}) // sends data to backend
            })
            // captures the output from the backend in format of string
            const data = await res.json()
            // checks for errors
            if(data.error) throw new Error(data.error)
            setMessages([...messages, data]) // sets messages to new array since the messages have been updated
        //error catching
        } catch (error) {
            //displays error
            toast.error(error.message)
        } finally {
            setLoading(false) // function has finished running
        }
    }

    return {sendMessage, loading}
}

export default useSendMessage