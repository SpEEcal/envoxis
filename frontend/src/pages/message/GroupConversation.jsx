import { useSocketContext } from '../../context/SocketContext'
import './message.css';
import useConversation from '../../zustand/useConversation'

const GroupConversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()
  const isSelected = selectedConversation?._id === conversation._id
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  const SetUpConvo = (e) => {
    setSelectedConversation(conversation)
    // for mobile users so that they can access the contact container
    $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.chat-container {width: 90vw;} .contact-container {width: 0%;} .user-desc{ width: 0%;} .message-container {width: 90vw; gap: 0px;} #convo-input{ width: 70%; } .convo-submit { padding: 8px 10px; right: 15px; top: 6px; } .custom-file-upload { right: 65px; } }</style>");
  }

  return (
    <div>
      <form id="selectedchat">
        <div form='selectedchat' className={`contact ${isSelected ? "bg-light-purple" : ""}`} onClick={(e) => SetUpConvo()}>
            <a href="#">
            <img className="contact-status" src={`${isOnline ? conversation.status : "../Messageimg/invis.png"}`} alt="" />
            <img className="contact-pfp" src={conversation.groupchatpfp} alt="" />
            <span className="detail-one">
                <span className="contact-name">{conversation.groupchatname}</span>
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

export default GroupConversation