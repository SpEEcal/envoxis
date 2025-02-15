import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation"

export const useUploadFile = () => {
    const {messages, setMessages, selectedConversation} = useConversation()

    const uploadfile = async (formData) => {
        try {
            const res = await fetch(`/api/messages/uploadfile/${selectedConversation._id}`, {
                method: "POST",
                body: formData
            })

            const data = await res.json()
            if (data.error){
                throw new Error(data.error)
            }

            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        }
    }

    return {uploadfile}
}

export default useUploadFile