import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notificationSound from "../assets/sounds/notification.mp3"
import { useAuthContext } from '../context/AuthContext'

const useListenGroupMessages = () => {
    const {socket} = useSocketContext() // receives the newMessage ping
    const {authUser} = useAuthContext() // gets all of the users information
    const {groupmessages, setGroupMessages} = useConversation() // gets messages array

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => { // checks if a new message has been sent
            newMessage.shouldShake = true // shakes the message
            var sound = null // allows sound to be accessed outside of if statement
            if (authUser.status != "../Messageimg/dnd.png"){  // checks if the user status is do not disturb
                sound = new Audio(notificationSound)
                sound.play() // plays notification sound
            }
            setGroupMessages([...groupmessages,newMessage]) // updates messages array
        })

        return () => socket.off("newMessage") // new message has been addressed
    }, [socket, setGroupMessages, groupmessages]) // all parameters needed
}

export default useListenGroupMessages