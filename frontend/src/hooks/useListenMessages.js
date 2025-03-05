import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notificationSound from "../assets/sounds/notification.mp3"
import { useAuthContext } from '../context/AuthContext'

const useListenMessages = () => {
    const {socket} = useSocketContext()
    const {authUser} = useAuthContext()
    const {messages, setMessages} = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true
            const sound = null
            if (authUser != "../Messageimg/dnd.png"){
                sound = new Audio(notificationSound)
                sound.play()
            }
            setMessages([...messages,newMessage])
        })

        return () => socket.off("newMessage")
    }, [,socket, setMessages, messages])
}

export default useListenMessages