import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
import crypto from "crypto"

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
            const decrypteddata = data.map((message) => {
                // encryption alogrithm
                const algorithm = 'aes-256-cbc'
                // private key
                const key = "anastasiascatwascalledmaxbutdead"

                //convert initialise vector from base64 to buffer
                const originaldata = Buffer.from(message.iv, 'base64')

                // decrypt string using aes and private key
                const decipher = crypto.createDecipheriv(algorithm, key, originaldata)
                let decrypted = decipher.update(message.message, "hex", "utf-8")
                decrypted += decipher.final("utf8")
                
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