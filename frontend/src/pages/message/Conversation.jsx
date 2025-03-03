import { useSocketContext } from '../../context/SocketContext'
import './message.css';
import useConversation from '../../zustand/useConversation'
import { useEffect } from 'react';
import $ from "jquery"

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()
  const isSelected = selectedConversation?._id === conversation._id
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  const SetUpConvo = (e) => {
    setSelectedConversation(conversation)
    $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.chat-container {width: 80%;} .contact-container {width: 0%;} .user-desc{ width: 0%;} .message-container {width: width: 100vw; gap: 0px;} #convo-input{ width: 70%; } .convo-submit { padding: 8px 10px; right: 15px; top: 6px; } .custom-file-upload { right: 65px; } }</style>");
  }

  return (
    <div>
      <form id="selectedchat">
        <div form='selectedchat' id='selectedchatconvobutton' className={`contact ${isSelected ? "bg-light-purple" : ""}`} onClick={(e) => SetUpConvo()}>
            <a href="#">
            <img className="contact-status" src={`${isOnline ? conversation.status : "../Messageimg/invis.png"}`} alt="" />
            <img className="contact-pfp" src={conversation.profilePic} alt="" />
            <span className="detail-one">
                <span className="contact-name">{conversation.username}</span>
              </span>
              <span className="detail-one">
                <span className="contact-last-message">Hello! Nice to meet you.</span>
            </span>
            <span className="detail-two">
                <span className="contact-message-time">13:20</span>
            </span>
            </a>
        </div>
       </form>
    </div>
  )
}

export default Conversation