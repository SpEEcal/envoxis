import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
import moment from 'moment';

const sentmessage = ({message}) => {
    const {authUser}= useAuthContext() // gets user from local storage to display
    const {selectedConversation} = useConversation() // gets the current conversation selected
    const fromMe = message.senderId === authUser._id // checks if the message came from the current user
    const chatClassName = fromMe ? 'chat-end' : 'chat-start'; // moves the chat bubble according to who sent the message
    const profilePic = fromMe ? authUser.profilePic: selectedConversation?.profilePic // checks what profile picture to use
    const bubbleBgColor = fromMe ? "bg-light-orange" : "" // checks what bubble colour to use
    const username = fromMe ? authUser.username: selectedConversation?.username // checks what username to use
    const shakeClass = message.shouldShake ? "shake" : "" // checks whether the message should shake

  return (
    <div className="sent-message-container">
        <div className={`chat ${chatClassName}`}> {/* allows for the chat bubbles to change in style */}
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS chat bubble component"
                    src={profilePic} /> {/* displays profile picture */}
                </div>
            </div>
            <div className="chat-header">
                {username} {/* displays username */}
            </div>
            <div className={`chat-bubble bg-light-orange ${bubbleBgColor} ${shakeClass}`}>
                {message.message} {/* displays the message sent */}
            </div>
            <time className={`sent_message_time`}>{moment(message.createdAt).format('HH:mm')}</time> {/* displays the message time */}
        </div>
    </div>
  )
}

export default sentmessage