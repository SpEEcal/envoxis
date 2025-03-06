import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendGroupMessage = () => {
    const [loading, setLoading] = useState(false)
    const {groupmessages, setGroupMessages, selectedConversation} = useConversation()
    const participants = selectedConversation.groupchatparticipants

    const sendGroupMessage = async (message) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/messages/sendG`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message, participants})
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)

            setGroupMessages([...groupmessages, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {sendGroupMessage, loading}
}

export default useSendGroupMessage