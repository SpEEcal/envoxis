import { useSocketContext } from '../../context/SocketContext'
import './message.css';
import useConversation from '../../zustand/useConversation'
import $ from "jquery"

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation() // gets conversation from zustand hook
  const isSelected = selectedConversation?._id === conversation._id // checks if the selected conversation id is the same as the conversation id from parameter
  const {onlineUsers} = useSocketContext() // gets online users
  const isOnline = onlineUsers.includes(conversation._id) // checks whether the user is online

  const SetUpConvo = (e) => {
    setSelectedConversation(conversation) // sets selected container to conversation to display in MessageContainer
    // for mobile users so that they can access the contact container
    $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.chat-container {width: 90vw;} .contact-container {width: 0%;} .user-desc{ width: 0%;} .message-container {width: 90vw; gap: 0px;} #convo-input{ width: 70%; } .convo-submit { padding: 8px 10px; right: 15px; top: 6px; } .custom-file-upload { right: 65px; } }</style>");
  }

  return (
    <div>
      <form id="selectedchat">
        <div form='selectedchat' id='selectedchatconvobutton' className={`contact ${isSelected ? "bg-light-purple" : ""}`} onClick={(e) => SetUpConvo()}> {/* sets a conversation between users */}
            <a href="#">
            <img className="contact-status" src={`${isOnline ? conversation.status : "../Messageimg/invis.png"}`} alt="" />
            <img className="contact-pfp" src={conversation.profilePic} alt="" /> {/* displays profile picture of user to be chatted to */}
            <span className="detail-one">
                <span className="contact-name">{conversation.username}</span> {/* displays username of user to be chatted to */}
            </span>
            </a>
        </div>
       </form>
    </div>
  )
}

export default Conversation