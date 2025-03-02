// library or external function to be used in program
import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
    // checks loading state of function
    const [loading, setLoading] = useState(false)
    // allows for messages to be used in other areas of the program
    const {messages, setMessages, selectedConversation} = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                // res captures the return from the backend
                // fetch is used to run a backend function to perform the action of getting the messages from the conversation
                const res = await fetch(`/api/messages/M/${selectedConversation._id}`)
                const data = await res.json() // gets encrypted messages to be returned from backend
                if(data.error) throw new Error(data.error) // checks for any errors from backend

                // map through every message in data array and then decrypt each message into a seperate array and then set that in "setMessages"
                const decrypted = await fetch("/api/messages/decrypt",{
                    method: "POST",
                    // gives the server information about the request
                    headers: {
                        "Content-Type": "application/json",
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({data}) // sends encrypted messages to be decrypted
                })
                const decrypteddata = await decrypted.json() // gets decrypted messages to be returned from backend

                if(decrypteddata.error) throw new Error(decrypteddata.error) // checks for any errors from backend

                setMessages(decrypteddata) // sets messages to decrypted messages to be displayed
            } catch (error) {
                toast.error(error.message) // displays error
            } finally{
                setLoading(false) // flag - everything has been complete
            }
        }

        // function calling itself if the user has clicked a conversation
        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id, setMessages]) // things to be used in getMessages function

    return {messages, loading} // returns messages and loading state to be used
}

export default useGetMessages