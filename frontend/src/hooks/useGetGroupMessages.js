import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetGroupMessages = () => {
    const [loading, setLoading] = useState(false)
    const {groupmessages, setGroupMessages, selectedConversation} = useConversation()
    console.log(selectedConversation.participants)

    useEffect(() => {
        const getGroupMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/GM/${selectedConversation.participants}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                // map through every message in data array and then decrypt each message into a seperate array and then set that in "setMessages"
                const decrypted = await fetch("/api/messages/decrypt",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({data})
                })
                console.log(data)
                const decrypteddata = await decrypted.json()
                console.log(decrypteddata)

                setGroupMessages(decrypteddata)
            } catch (error) {
                toast.error(error.message)
            } finally{
                setLoading(false)
            }
        }

        if(selectedConversation?._id) getGroupMessages()
    },[selectedConversation?._id, setGroupMessages])

    return {groupmessages, loading}
}

export default useGetGroupMessages