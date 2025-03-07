import { useAuthContext } from '../../context/AuthContext'
import useGetSenderOfRequest from '../../hooks/useGetSenderOfRequest';
import moment from 'moment';
import './message.css';

const sendGroupimage = ({message}) => {
    const senderid = message.senderId
    const {senderinfo} = useGetSenderOfRequest(senderid)
    const {authUser}= useAuthContext() // gets user from local storage to display
    const fromMe = message.senderId === authUser._id // checks if the message came from the current user
    const chatClassName = fromMe ? 'chat-end' : 'chat-start'; // moves the chat bubble according to who sent the message
    const profilePic = fromMe ? authUser.profilePic: senderinfo[0]?.profilePic // checks what profile picture to use
    const bubbleBgColor = fromMe ? "bg-light-orange" : "" // checks what bubble colour to use
    const username = fromMe ? authUser.username: senderinfo[0]?.username // checks what username to use
    const shakeClass = message.shouldShake ? "shake" : "" // checks whether the message should shake

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
            {console.log(message.message)}
            <img className='ImageContainer'
                alt="${}"
                src={message.message} />
            </div>
            <time className={`sent_message_time`}>{moment(message.createdAt).format('HH:mm')}</time>
        </div>
    </div>
  )
}

export default sendGroupimage