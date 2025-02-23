import { useSocketContext } from '../../context/SocketContext'
import './message.css';
import useConversation from '../../zustand/useConversation'

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()
  const isSelected = selectedConversation?._id === conversation._id
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <div>
      <form id="selectedchat">
        <div form='selectedchat' className={`contact ${isSelected ? "bg-light-purple" : ""}`} onClick={(e) => setSelectedConversation(conversation)}>
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