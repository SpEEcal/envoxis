import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetGroupChats = () => {
    const [loading, setLoading] = useState(false)
    const [groupconversations, setGroupConversation] = useState([])

    useEffect(() => {
        const getGroupChatConversations = async () => {
            setLoading(true)

            try {
                const res = await fetch('/api/users/getgroupchatsforsidebar')
                const data = await res.json()

                if(data.error){
                    throw new Error(data.error)
                }
                setGroupConversation(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        getGroupChatConversations()
    },[])

    return { loading, groupconversations }
}

export default useGetGroupChats