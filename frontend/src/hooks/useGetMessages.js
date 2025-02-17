import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/M/${selectedConversation._id}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                // map through every message in data array and then decrypt each message into a seperate array and then set that in "setMessages"
                const decrypteddata = await("/api/messages/decrypt",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({data})
                })
                setMessages(decrypteddata)
            } catch (error) {
                toast.error(error.message)
            } finally{
                setLoading(false)
            }
        }

        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id, setMessages])

    return {messages, loading}
}

export default useGetMessages