import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
import moment from 'moment';
import './message.css';

const sendfile = ({message}) => {
    const {authUser}= useAuthContext()
    const {selectedConversation} = useConversation()
    const fromMe = message.senderId === authUser._id
    //const formattedTime = moment().format('HH:mm')
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic: selectedConversation?.profilePic
    const bubbleBgColor = fromMe ? "bg-light-orange" : ""
    const username = fromMe ? authUser.username: selectedConversation?.username
    const shakeClass = message.shouldShake ? "shake" : ""

  return (
    <div className="sent-message-container">
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS chat bubble component"
                    src={profilePic} />
                </div>
            </div>
            <div className="chat-header">
                {username}
            </div>
            <div className={`chat-bubble bg-light-orange ${bubbleBgColor} ${shakeClass}`}>
                <a href={message.message}>{message.filename}</a>
            </div>
            <time className={`sent_message_time`}>{moment(message.createdAt).format('HH:mm')}</time>
        </div>
    </div>
  )
}

export default sendfile